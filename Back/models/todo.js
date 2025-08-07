import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  tasks: [
    {
      text: String,
      done: { type: Boolean, default: false }
    }
  ]
});

export default mongoose.model('Todo', todoSchema);
