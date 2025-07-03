const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  email: String,
  password: String,
}));

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ username });

  if (userExists) {
    return res.status(400).json({ message: 'Benutzername existiert bereits.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: 'Registrierung erfolgreich!' });
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: 'Benutzer nicht gefunden.' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Falsches Passwort.' });
  }

  res.status(200).json({ message: 'Login erfolgreich!' });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
