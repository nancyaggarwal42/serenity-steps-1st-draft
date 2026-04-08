import mongoose from 'mongoose';

// Tracks each user's daily completion of general tasks
const userGeneralTaskSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  generalTaskId: { type: mongoose.Schema.Types.ObjectId, ref: 'GeneralTask', required: true },
  date:          { type: String, required: true }, // 'YYYY-MM-DD'
  completed:     { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('UserGeneralTask', userGeneralTaskSchema);