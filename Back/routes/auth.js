import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config(); 

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
  const { email, password, nom, prenom } = req.body; 
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      email,
      password: hashed,
      nom,
      prenom
    });

    res.json({ message: 'Compte créé', userId: user._id });

  } catch (err) {
    console.error("Erreur MongoDB :", err); 
    res.status(400).json({ error: 'Email déjà utilisé !!!' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Mot de passe incorrect' });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

  res.json({
    message: 'Connecté',
    token,
    admin: {
      id: user._id,
      email: user.email,
      nom: user.nom,
      prenom: user.prenom
    }
  });
});



export default router;
