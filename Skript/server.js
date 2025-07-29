require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

const jwt_Key = process.env.jwt_Key;
if (!jwt_Key) {
  console.warn('Warning: jwt_Key is not secure!!! Using a fallback.');
  jwt_Key = 'fallback_secret_for_dev';
}

const MongoDB_Uri = process.env.MongoDB_Uri;
if (!MongoDB_Uri) { console.error('Fehler: MongoDB_Uri ist nicht in der .env-Datei gesetzt oder wurde nicht geladen.'); process.exit(1); }

app.use(cors());
app.use(express.json());

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'Authentifizierungstoken fehlt.'});
  }

  jwt.verify(token, process.env.jwt_Key, (err, user) => {
    if (err){
      console.error('JWT Verifizierungsfehler:', err);
      return res.status(403).json({message: 'Token ist ungültig oder abgelaufen.'});
    }
    req.user = user;
    next();
  })
}

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

mongoose.connect(MongoDB_Uri, { useNewUrlParser: true, useUnifiedTopology: true, })
  .then(() => console.log('MongoDB verbunden...'))
  .catch(err => console.error('MongoDB Verbindungsfehler:', err));

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Alle Felder sind erforderlich.' });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(409).json({ message: 'Benutzername existiert bereits.' });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ message: 'E-Mail-Adresse wird bereits verwendet.' });
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
    if(!user){
      return res.status(404).json({message:'Benutzer nicht gefunden.'});
    }
    res.status(200).json({playerdata: user.playerdata});
  } catch (error){
    console.error('Fehler beim Abrufen der Playerdata.', error);
    res.status(500).json({message:'Interner Serverfehler beim Abrufen der Playerdata'})
  }
})

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
