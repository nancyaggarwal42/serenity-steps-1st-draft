import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:           { type: String, required: true },
  email:          { type: String, required: true, unique: true },
  password:       { type: String, required: true },
  age:            { type: Number, required: true },
  gender:         { type: String, enum: ['male', 'female', 'other'], required: true },
  addictions:     [{ type: String }],
  quizCompleted:  { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('User', userSchema);