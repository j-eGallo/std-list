import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import tasksRoutes from './routes/tasks.js';

console.log("Le fichier server.js démarre");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;




app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);

async function startServer() {

  try {

    console.log("Connexion Mongo...");

    await mongoose.connect(process.env.MONGO_URI)

    console.log('MongoDB est connecté !');


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
  } catch (err) {

    console.error('Erreur MongoDB :', err);

  }

}

startServer();