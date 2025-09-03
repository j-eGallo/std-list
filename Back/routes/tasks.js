import express from 'express';
import jwt from 'jsonwebtoken';
import Task from '../models/task.js';


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token manquant' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(403).json({ error: 'Token invalide' });
  }
}

router.get('/:date', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId, date: req.params.date });
    res.json(tasks);
  } catch (err) {
    console.error("❌ Erreur GET /tasks/:date :", err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


router.post('/:date', auth, async (req, res) => {
  const { tasks } = req.body;
  const date = req.params.date;
  const existing = await Task.findOneAndUpdate(
    { userId: req.userId, date },
    { tasks },
    { upsert: true, new: true }
  );
  res.json({ message: 'To-do enregistrée', task: existing });
});

router.post('/', auth, async (req, res) => {
  try {
    const { text, date } = req.body;
    if (!text || !date) return res.status(400).json({ error: "Champs manquants" });

    const newTask = new Task({
      userId: req.userId,
      text,
      date
    });

    await newTask.save();
    res.status(201).json({ message: "Tâche ajoutée", task: newTask });
  } catch (err) {
    console.error("Erreur POST /tasks :", err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { text, date } = req.body;
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { text, date },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Tâche non trouvée" });

    res.json({ message: "Tâche mise à jour", task: updated });
  } catch (err) {
    console.error("Erreur PUT /tasks/:id :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Tâche non trouvée' });
    res.json({ message: 'Tâche supprimée' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
