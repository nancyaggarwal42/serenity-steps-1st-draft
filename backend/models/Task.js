import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  addiction:   { type: String, required: true },
  title:       { type: String, required: true },
  description: { type: String },
  completed:   { type: Boolean, default: false },
  date:        { type: String, required: true }, // 'YYYY-MM-DD' — one set per day
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);