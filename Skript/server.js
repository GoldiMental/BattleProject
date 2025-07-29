require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = 3000;

const jwt_Key = process.env.jwt_Key;
if (!jwt_Key) {
    console.warn('Warning: jwt_Key is not set in .env! Using a fallback (NOT SECURE FOR PRODUCTION).');
    process.exit(1);
}

const MongoDB_Uri = process.env.MongoDB_Uri;
if (!MongoDB_Uri) {
    console.error('Fehler: MongoDB_Uri ist nicht in der .env-Datei gesetzt oder wurde nicht geladen.');
    process.exit(1);
}

app.use(cors());
app.use(express.json());

mongoose.connect(MongoDB_Uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas verbunden...'))
.catch(err => console.error('MongoDB Atlas Verbindungsfehler:', err));

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    playerdata: {
        type: Object,
        default: {
            name: "", Gold: 500, Cheats: 0, catchedTulpas: 0, actualMap: "MAP",
            Tulpas: {
                Slot_1: { name: "", Lv: 0, HP: 0, HP_Total: 0, XP: 0, ID: "" }, Slot_2: { name: "", Lv: 0, HP: 0, HP_Total: 0, XP: 0, ID: "" },
                Slot_3: { name: "", Lv: 0, HP: 0, HP_Total: 0, XP: 0, ID: "" }, Slot_4: { name: "", Lv: 0, HP: 0, HP_Total: 0, XP: 0, ID: "" },
                Slot_5: { name: "", Lv: 0, HP: 0, HP_Total: 0, XP: 0, ID: "" }, Slot_6: { name: "", Lv: 0, HP: 0, HP_Total: 0, XP: 0, ID: "" },
                PC: [],
            },
            inventory: {
                balls: { Tulpaball: 5, Super_Tulpaball: 0, Hyper_Tulpaball: 0, Ultra_Tulpaball: 0, },
                drinks: { Heiltrank: 5, Super_Heiltrank: 0, Manatrank: 0, Super_Manatrank: 0, },
                bonbons: { Bonbon: 0, Super_Bonbon: 0, Hyper_Bonbon: 0, }
            },
            defeatedTrainer: [], tulpaGegeben: false,
        }
    }
}));

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'Authentifizierungstoken fehlt.' });
    }

    jwt.verify(token, jwt_Key, (err, user) => {
        if (err) {
            console.error('JWT Verifizierungsfehler:', err);
            return res.status(403).json({ message: 'Token ist ungültig oder abgelaufen.' });
        }
        req.user = user;
        next();
    });
}

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Alle Felder sind erforderlich.' });
        }

        const userExists = await User.findOne({ $or: [{ username }, { email }] });
        if (userExists) {
            if (userExists.username === username) {
                return res.status(409).json({ message: 'Benutzername existiert bereits.' });
            }
            if (userExists.email === email) {
                return res.status(409).json({ message: 'E-Mail-Adresse wird bereits verwendet.' });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Registrierung erfolgreich!' });

    } catch (error) {
        console.error('Registrierungsfehler:', error);
        res.status(500).json({ message: 'Interner Serverfehler bei der Registrierung.' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Benutzername und Passwort sind erforderlich.' });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Ungültige Anmeldeinformationen.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Ungültige Anmeldeinformationen.' });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, playerdata: user.playerdata },
            jwt_Key,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login erfolgreich!',
            token: token,
            username: user.username,
            playerdata: user.playerdata
        });

    } catch (error) {
        console.error('Loginfehler:', error);
        res.status(500).json({ message: 'Interner Serverfehler beim Login.' });
    }
});

app.get('/api/playerdata', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden.' });
        }
        res.status(200).json({ playerdata: user.playerdata, username: user.username });
    } catch (error) {
        console.error('Fehler beim Abrufen der Playerdata:', error);
        res.status(500).json({ message: 'Interner Serverfehler beim Abrufen der Playerdata.' });
    }
});

app.post('/api/savegame', authenticateToken, async (req, res) => {
    const { playerdata } = req.body;
    const userId = req.user.id;

    if (!playerdata) {
        return res.status(400).json({ message: 'Spielerdaten fehlen im Anfrage-Body.' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { playerdata: playerdata } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden.' });
        }

        console.log(`Spielerdaten für Benutzer ${req.user.username} (ID: ${userId}) erfolgreich gespeichert.`);
        res.status(200).json({ message: 'Spiel erfolgreich gespeichert!', playerdata: updatedUser.playerdata });

    } catch (error) {
        console.error('Fehler beim Speichern der Spielerdaten:', error);
        res.status(500).json({ message: 'Interner Serverfehler beim Speichern der Spielerdaten.' });
    }
});

const frontendPath = path.join(__dirname, '..');

app.use(express.static(frontendPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.get('/game.html', (req, res) => {
    res.sendFile(path.join(frontendPath, 'game.html'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(frontendPath, '404.html'), (err) => {
        if (err) {
            res.status(404).send('Seite nicht gefunden.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://18.185.120.26:${PORT}`);
});