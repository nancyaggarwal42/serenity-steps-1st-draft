import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weekStart:  { type: String, required: true }, // 'YYYY-MM-DD' of Monday
  couponCode: { type: String },
  tier:       { type: String, enum: ['bronze', 'silver', 'gold', 'none'], default: 'none' },
  claimed:    { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Reward', rewardSchema);