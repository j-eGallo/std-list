import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  date: { type: String, required: true }, // Format YYYY-MM-DD
  done: { type: Boolean, default: false }
});

export default mongoose.model('Task', taskSchema);
