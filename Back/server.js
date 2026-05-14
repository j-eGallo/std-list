import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import tasksRoutes from './routes/tasks.js';

console.log("Le fichier server.js démarre");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);

async function startServer() {

  try {

    console.log("Connexion Mongo...");

    await mongoose.connect('mongodb://127.0.0.1:27017/stdlist');

    console.log('MongoDB est connecté !');

    app.listen(3000, () => {
      console.log('Serveur lancé sur http://localhost:3000');
    });

  } catch (err) {

    console.error('Erreur MongoDB :', err);

  }

}

startServer();