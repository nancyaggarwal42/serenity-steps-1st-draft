import GeneralTask from '../models/GeneralTask.js';
import UserGeneralTask from '../models/UserGeneralTask.js';

const todayDate = () => new Date().toISOString().split('T')[0];

export const getGeneralTasks = async (req, res) => {
  try {
    const today = todayDate();
    const allTasks = await GeneralTask.find();

    // Get or create user's completion records for today
    let userRecords = await UserGeneralTask.find({ userId: req.user.id, date: today });

    if (userRecords.length === 0) {
      const newRecords = allTasks.map(t => ({
        userId: req.user.id,
        generalTaskId: t._id,
        date: today,
        completed: false,
      }));
      userRecords = await UserGeneralTask.insertMany(newRecords);
    }

    // Merge task info with completion status
    const merged = allTasks.map(task => {
      const record = userRecords.find(r => r.generalTaskId.toString() === task._id.toString());
      return {
        _id:           record?._id,
        generalTaskId: task._id,
        title:         task.title,
        description:   task.description,
        icon:          task.icon,
        completed:     record?.completed || false,
        date:          today,
      };
    });

    const completed = merged.filter(t => t.completed).length;
    res.json({ tasks: merged, total: merged.length, completed });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const toggleGeneralTask = async (req, res) => {
  try {
    const record = await UserGeneralTask.findOne({ _id: req.params.id, userId: req.user.id });
    if (!record) return res.status(404).json({ message: 'Task record not found' });

    record.completed = !record.completed;
    await record.save();
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};