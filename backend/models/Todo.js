import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text:      { type: String, required: true },
  time:      { type: String, default: '' },   // e.g. "09:30"
  completed: { type: Boolean, default: false },
  priority:  { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
}, { timestamps: true });

export default mongoose.model('Todo', todoSchema);