import express from 'express';
import jwt from 'jsonwebtoken';
import Todo from '../models/todo.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware de vérif du token
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

// Get todos by date
router.get('/:date', auth, async (req, res) => {
  const todo = await Todo.findOne({ userId: req.userId, date: req.params.date });
  res.json(todo || { tasks: [] });
});

// Save or update todos
router.post('/:date', auth, async (req, res) => {
  const { tasks } = req.body;
  const date = req.params.date;
  const existing = await Todo.findOneAndUpdate(
    { userId: req.userId, date },
    { tasks },
    { upsert: true, new: true }
  );
  res.json({ message: 'To-do enregistrée', todo: existing });
});

export default router;
