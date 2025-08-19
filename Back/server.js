import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'; 

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

mongoose.connect('mongodb://localhost:27017/stdlist')
  .then(() => {
    console.log('✅ MongoDB connecté');
    app.listen(3000, () => console.log('✅ Serveur lancé sur http://localhost:3000'));
  })
  .catch(err => console.error('❌ Erreur MongoDB :', err));
