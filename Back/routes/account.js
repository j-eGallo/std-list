import express from 'express';
import bcrypt from 'bcrypt';

import User from '../models/User.js';

const router = express.Router();

router.put('/email', async (req, res) => {

  try {

    const {
      userId,
      newEmail,
      password
    } = req.body;

    if (
      !userId ||
      !newEmail ||
      !password
    ) {

      return res.status(400).json({
        error: 'Champs manquants'
      });

    }

    const user = await User.findById(userId);

    if (!user) {

      return res.status(404).json({
        error: 'Utilisateur introuvable'
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(401).json({
        error: 'Mot de passe incorrect'
      });

    }

    user.email = newEmail;

    await user.save();

    return res.json({
      message: 'Email modifié'
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: 'Erreur serveur'
    });

  }

});

router.put('/password', async (req, res) => {

  try {

    const {
      userId,
      currentPassword,
      newPassword
    } = req.body;

    if (
      !userId ||
      !currentPassword ||
      !newPassword
    ) {

      return res.status(400).json({
        error: 'Champs manquants'
      });

    }

    const user = await User.findById(userId);

    if (!user) {

      return res.status(404).json({
        error: 'Utilisateur introuvable'
      });

    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {

      return res.status(401).json({
        error: 'Mot de passe incorrect'
      });

    }

    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return res.json({
      message: 'Mot de passe modifié'
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: 'Erreur serveur'
    });

  }

});

router.delete('/delete', async (req, res) => {

  try {

    const {
      userId,
      password
    } = req.body;

    if (!userId || !password) {

      return res.status(400).json({
        error: 'Champs manquants'
      });

    }

    const user = await User.findById(userId);

    if (!user) {

      return res.status(404).json({
        error: 'Utilisateur introuvable'
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(401).json({
        error: 'Mot de passe incorrect'
      });

    }

    await User.findByIdAndDelete(userId);

    return res.json({
      message: 'Compte supprimé'
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: 'Erreur serveur'
    });

  }

});

export default router;