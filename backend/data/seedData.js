import 'dotenv/config';
import mongoose from 'mongoose';
import Quote from '../models/Quote.js';
import GeneralTask from '../models/GeneralTask.js';

await mongoose.connect(process.env.MONGO_URI);

// ── Quotes ──────────────────────────────────────────────
const quotes = [
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Every day is a new beginning. Take a deep breath and start again.", author: "Unknown" },
  { text: "Recovery is not a race. You don't have to feel guilty if it takes longer than you thought.", author: "Unknown" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Strength does not come from winning. Your struggles develop your strengths.", author: "Arnold Schwarzenegger" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Small steps every day lead to big changes over time.", author: "Unknown" },
  { text: "You are stronger than your addiction.", author: "Unknown" },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
  { text: "Progress, not perfection.", author: "Unknown" },
  { text: "Your life does not get better by chance. It gets better by change.", author: "Jim Rohn" },
  { text: "The only person you should try to be better than is who you were yesterday.", author: "Unknown" },
  { text: "Difficult roads often lead to beautiful destinations.", author: "Unknown" },
  { text: "You are not your addiction. You are a person who deserves healing.", author: "Unknown" },
  { text: "One day at a time. One step at a time.", author: "Unknown" },
  { text: "Healing is not linear. Be patient with yourself.", author: "Unknown" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { text: "You are capable of amazing things. Start with believing that.", author: "Unknown" },
  { text: "Every moment is a fresh beginning.", author: "T.S. Eliot" },
  { text: "Do not wait for the perfect moment. Take the moment and make it perfect.", author: "Unknown" },
  { text: "Your present circumstances don't determine where you can go; they merely determine where you start.", author: "Nido Qubein" },
  { text: "The comeback is always stronger than the setback.", author: "Unknown" },
  { text: "Be gentle with yourself. You are a child of the universe.", author: "Max Ehrmann" },
  { text: "Rock bottom became the solid foundation on which I rebuilt my life.", author: "J.K. Rowling" },
  { text: "You have been assigned this mountain to show others it can be moved.", author: "Unknown" },
  { text: "Courage is not the absence of fear, but taking action in spite of it.", author: "Unknown" },
  { text: "Every strike brings me closer to the next home run.", author: "Babe Ruth" },
  { text: "It always seems impossible until it is done.", author: "Nelson Mandela" },
  { text: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown" },
];

// ── General Tasks (same 7 shown to every user daily) ────
const generalTasks = [
  { title: 'Drink 8 glasses of water',   description: 'Stay hydrated throughout the day. Set hourly reminders if needed.',           icon: '💧' },
  { title: 'Morning stretch — 10 mins',  description: 'Start your day with light stretching. It boosts energy and reduces anxiety.', icon: '🧘' },
  { title: 'Write 3 things you\'re grateful for', description: 'Gratitude rewires your brain for positivity. Use a journal or notes app.', icon: '📓' },
  { title: 'Go outside for 15 minutes',  description: 'Fresh air and sunlight improve mood, focus, and sleep quality.',               icon: '☀️' },
  { title: 'No screens 30 mins before bed', description: 'Blue light disrupts melatonin. Read, meditate, or talk instead.',          icon: '🌙' },
  { title: 'Do one act of kindness',     description: 'Help someone, compliment a stranger, or simply listen to a friend.',          icon: '💛' },
  { title: 'Spend 10 mins in silence',   description: 'Meditation or mindful silence reduces cortisol and sharpens focus.',          icon: '🧠' },
];

await Quote.deleteMany({});
await GeneralTask.deleteMany({});
await Quote.insertMany(quotes);
await GeneralTask.insertMany(generalTasks);

console.log('✅ Seeded', quotes.length, 'quotes and', generalTasks.length, 'general tasks');
await mongoose.disconnect();