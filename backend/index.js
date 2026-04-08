import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import addictionRoutes from './routes/addiction.js';
import taskRoutes from './routes/tasks.js';
import rewardRoutes from './routes/rewards.js';
import quoteRoutes       from './routes/quotes.js';
import generalTaskRoutes from './routes/generalTasks.js';
import router from './routes/todos.js';

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

console.log('Mongo db', process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/addiction', addictionRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/quote',         quoteRoutes);
app.use('/api/general-tasks', generalTaskRoutes);
app.use('/api/todos', router);

const port = process.env.PORT

app.listen(port, () => console.log('Server running on port 5000'));