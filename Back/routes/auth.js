import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.use(cors());

router.options('/register', cors());

router.options('/login', cors());

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {

  try {

    const {
      email,
      password,
      nom,
      prenom
    } = req.body;

    if (
      !email ||
      !password ||
      !nom ||
      !prenom
    ) {

      return res.status(400).json({
        error: 'Tous les champs sont requis'
      });

    }

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {

      return res.status(400).json({
        error: 'Email déjà utilisé'
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      nom,
      prenom
    });

    const token = jwt.sign(
      {
        userId: user._id
      },
      JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    return res.status(201).json({

      message: 'Compte créé',

      token,

      admin: {
        id: user._id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom
      }

    });

  } catch (err) {

    console.error(
      'Erreur register :',
      err
    );

    return res.status(500).json({
      error: 'Erreur serveur'
    });

  }

});

router.post('/login', async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        error: 'Champs manquants'
      });

    }

    const user = await User.findOne({
      email
    });

    if (!user) {

      return res.status(400).json({
        error: 'Utilisateur non trouvé'
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(401).json({
        error: 'Mot de passe incorrect'
      });

    }

    const token = jwt.sign(
      {
        userId: user._id
      },
      JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    return res.json({

      message: 'Connecté',

      token,

      admin: {
        id: user._id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom
      }

    });

  } catch (err) {

    console.error(
      'Erreur login :',
      err
    );

    return res.status(500).json({
      error: 'Erreur serveur'
    });

  }

});

export default router;