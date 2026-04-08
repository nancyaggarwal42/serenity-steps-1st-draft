import Task from '../models/Task.js';
import Reward from '../models/Reward.js';

// Get Monday of current week
const getWeekStart = () => {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon...
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust to Monday
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split('T')[0];
};

// Get all 7 dates of current week (Mon–Sun)
const getWeekDates = () => {
  const monday = new Date(getWeekStart());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().split('T')[0];
  });
};

const COUPONS = {
  bronze: { code: 'SERENITY33', discount: '10% off on MindFit Pro',   desc: 'Bronze Reward — Keep going!',        color: '#cd7f32' },
  silver: { code: 'SERENITY50', discount: '25% off on WellnessBox',   desc: 'Silver Reward — Great progress!',    color: '#a8a9ad' },
  gold:   { code: 'SERENITY100', discount: 'FREE 1-month therapy session', desc: 'Gold Reward — Incredible work!', color: '#ffd700' },
};

const getTier = (percent) => {
  if (percent >= 100) return 'gold';
  if (percent >= 50)  return 'silver';
  if (percent >= 33)  return 'bronze';
  return 'none';
};

export const getWeeklyProgress = async (req, res) => {
  try {
    const weekStart = getWeekStart();
    const weekDates = getWeekDates();

    // Fetch all tasks this week
    const tasks = await Task.find({ userId: req.user.id, date: { $in: weekDates } });

    const totalTasks     = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const percent        = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Daily breakdown (for the bar chart)
    const dailyBreakdown = weekDates.map(date => {
      const dayTasks     = tasks.filter(t => t.date === date);
      const dayCompleted = dayTasks.filter(t => t.completed).length;
      return { date, total: dayTasks.length, completed: dayCompleted };
    });

    // Coupon logic
    const tier = getTier(percent);
    let reward = null;

    if (tier !== 'none') {
      // Upsert reward for this week
      reward = await Reward.findOneAndUpdate(
        { userId: req.user.id, weekStart },
        { tier, couponCode: COUPONS[tier].code, claimed: false },
        { upsert: true, new: true }
      );
    }

    res.json({
      weekStart,
      weekDates,
      totalTasks,
      completedTasks,
      percent,
      tier,
      coupon:         tier !== 'none' ? COUPONS[tier] : null,
      dailyBreakdown,
      reward,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const claimReward = async (req, res) => {
  try {
    const weekStart = getWeekStart();
    const reward = await Reward.findOne({ userId: req.user.id, weekStart });
    if (!reward || reward.tier === 'none') return res.status(404).json({ message: 'No reward to claim.' });
    if (reward.claimed) return res.json({ message: 'Already claimed', reward });

    reward.claimed = true;
    await reward.save();
    res.json({ message: 'Reward claimed!', reward });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};