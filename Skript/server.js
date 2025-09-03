require('dotenv').config();
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();
const PORT = 3000;
const MAINTENANCE_MODE = false;
app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..'));

const jwt_Key = process.env.jwt_Key;
if (!jwt_Key) {
    console.warn('Fehler: jwt_Key ist nicht in der .env-Datei gesetzt oder wurde nicht geladen.');
    process.exit(1);
}

const MongoDB_Uri = process.env.MongoDB_Uri;
if (!MongoDB_Uri) {
    console.error('Fehler: MongoDB_Uri ist nicht in der .env-Datei gesetzt oder wurde nicht geladen.');
    process.exit(1);
}

app.use((req, res, next) => {
    if (MAINTENANCE_MODE) {
        return res.render('503', { gameServerIP: `http://${OpenIP}:3000` });
    }
    next();
})

const OpenIP = process.env.OPEN_IP;

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    playerdata: {
        type: Object,
        default: {
            name: "", Gold: 500, Cheats: 0, catchedTulpas: 0, actualMap: "MAP", MapX: 0, MapY: 0,
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

const options = {
    auth: {
        api_key: process.env.SENDGRID_API_KEY
    }
}

const transporter = nodemailer.createTransport(sgTransport(options));
const privateMail = process.env.PRIVATE_MAIL;

mongoose.connect(MongoDB_Uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Atlas verbunden...'))
    .catch(err => console.error('MongoDB Atlas Verbindungsfehler:', err));

app.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(200).json({ message: 'Wenn eine E-Mail-Adresse mit diesem Konto verknüpft ist, haben wir Ihnen Anweisungen zum Zurücksetzen des Passwortes gesendet.' });
        }

        const resetToken = jwt.sign({ id: user._id }, jwt_Key, { expiresIn: '15m' });

        const mailOptions = {
            from: privateMail,
            to: user.email,
            subject: 'TulpaKing® - Passwort zurücksetzen',
            html: `
                <h2>Hallo Trainer ${user.username},</h2>
                <p>Du hast eine Anfrage zum Zurücksetzen des Passworts auf TulpaKing gestellt.</p>
                <p>Klicke auf den folgenden Link, um dein Passwort zurückzusetzen:</p>
                <a href="http://${OpenIP}:3000/reset-password.html?token=${resetToken}">Link zum Zurücksetzen des Passworts</a>
                <strong>Dieser Link ist nur 15 Minuten lang gültig.</strong>
                <p>Wenn Sie diese Anfrage nicht gestellt haben, können Sie diese Email ignorieren.</p>
                <p>Bei Bedenken antworten Sie gerne auch auf diese Email. Unser Team wird sich zeitnah um Ihre Bedenken kümmern.</p><br>
                <p>Wir wünschen Ihnen weiterhin viel Spaß mit TulpaKing</p>
                <p>Mit freundlichen Grüßen</p>
                <p>GoldiMental Entertainment</p>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Fehler beim Senden der E-Mail:', error);
            } else {
                console.log('E-Mail gesendet:', info.response);
            }
        });

        res.status(200).json({ message: 'Wenn eine E-Mail-Adresse mit diesem Konto verknüpft ist, haben wir Ihnen Anweisungen zum Zurücksetzen des Passwortes gesendet. Überprüfen Sie auch den Spam-Ordner!' });
    } catch (error) {
        console.error('Fehler beim Passwort-Reset:', error);
        res.status(500).json({ message: 'Interner Serverfehler.' });
    }
});

app.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        let decoded;
        try {
            decoded = jwt.verify(token, jwt_Key);
        } catch (err) {
            return res.status(400).json({ message: 'Ungültiger oder abgelaufener Token.' });
        }

        const userId = decoded.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Passwort erfolgreich zurückgesetzt!' });
    } catch (error) {
        console.error('Fehler beim Passwort-Reset:', error);
        res.status(500).json({ message: 'Interner Serverfehler.' });
    }
});

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
    res.render('index', { gameServerIP: `http://${OpenIP}:3000` });
});

app.get('/game.html', (req, res) => {
    res.render('game', { gameServerIP: `http://${OpenIP}:3000` });
});

app.get('/forgot-password.html', (req, res) => {
    res.render('forgot-password', { gameServerIP: `http://${OpenIP}:3000` });
});

app.get('/reset-password.html', (req, res) => {
    res.render('reset-password', { gameServerIP: `http://${OpenIP}:3000` });
});

app.get('/impressum.html', (req, res) => {
    res.render('impressum', { gameServerIP: `http://${OpenIP}:3000` });
});

app.get('/Info.html', (req, res) => {
    res.render('Info', { gameServerIP: `http://${OpenIP}:3000` });
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(frontendPath, '404.html'), (err) => {
        if (err) {
            res.status(404).send('Seite nicht gefunden.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://${OpenIP}:${PORT}`);
});