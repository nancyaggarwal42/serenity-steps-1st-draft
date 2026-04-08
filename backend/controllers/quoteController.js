import Quote from '../models/Quote.js';

// Returns a different quote each day based on day-of-year index
export const getDailyQuote = async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    if (count === 0) return res.status(404).json({ message: 'No quotes found. Run the seed script.' });

    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const index = dayOfYear % count;

    const quotes = await Quote.find().skip(index).limit(1);
    res.json(quotes[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};