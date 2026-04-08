import mongoose from 'mongoose';

// Master list of general tasks (same for all users, seeded once)
const generalTaskSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  icon:        { type: String }, // emoji
});

export default mongoose.model('GeneralTask', generalTaskSchema);