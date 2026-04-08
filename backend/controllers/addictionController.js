import User from '../models/User.js';

const OPTION_SCORES = { Never: 0, Rarely: 1, Sometimes: 2, Often: 3, Always: 3 };
const TIME_SCORES   = { '<1hr': 0, '1-3hr': 2, '>3hr': 3 };
const THRESHOLD     = 6;

const getScore = (val) => {
  if (val in OPTION_SCORES) return OPTION_SCORES[val];
  if (val in TIME_SCORES)   return TIME_SCORES[val];
  return 0;
};

export const detectFromQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    const detected = [];

    for (const [category, categoryAnswers] of Object.entries(answers)) {
      const total = categoryAnswers.reduce((sum, ans) => sum + getScore(ans), 0);
      if (total >= THRESHOLD) detected.push(category);
    }

    await User.findByIdAndUpdate(req.user.id, { addictions: detected, quizCompleted: true });
    res.json({ addictions: detected });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const saveKnownAddictions = async (req, res) => {
  try {
    const { addictions } = req.body;
    await User.findByIdAndUpdate(req.user.id, { addictions, quizCompleted: true });
    res.json({ addictions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};