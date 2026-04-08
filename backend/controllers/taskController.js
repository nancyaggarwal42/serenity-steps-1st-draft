import Task from '../models/Task.js';
import User from '../models/User.js';
import { taskTemplates } from '../data/taskTemplates.js';

const todayDate = () => new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

const pickRandom = (arr, n) => {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
};

// GET /api/tasks — fetch or auto-generate today's tasks
export const getTasks = async (req, res) => {
  try {
    const today = todayDate();
    const user = await User.findById(req.user.id);

    if (!user.addictions || user.addictions.length === 0) {
      return res.status(400).json({ message: 'No addictions identified yet.' });
    }

    // Check if tasks already generated for today
    let tasks = await Task.find({ userId: req.user.id, date: today });

    if (tasks.length === 0) {
      // Generate fresh tasks for today
      const newTasks = [];

      for (const addiction of user.addictions) {
        const templates = taskTemplates[addiction];
        if (!templates) continue;

        // 5 tasks if user has 1 addiction, fewer if multiple to avoid overload
        const count = user.addictions.length === 1 ? 6 : Math.max(3, Math.floor(6 / user.addictions.length));
        const picked = pickRandom(templates, count);

        picked.forEach(t => {
          newTasks.push({ userId: req.user.id, addiction, title: t.title, description: t.description, date: today, completed: false });
        });
      }

      tasks = await Task.insertMany(newTasks);
    }

    // Group by addiction
    const grouped = {};
    tasks.forEach(t => {
      if (!grouped[t.addiction]) grouped[t.addiction] = [];
      grouped[t.addiction].push(t);
    });

    res.json({ date: today, grouped, total: tasks.length, completed: tasks.filter(t => t.completed).length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/tasks/:id/complete — mark a task complete/incomplete
export const toggleTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};