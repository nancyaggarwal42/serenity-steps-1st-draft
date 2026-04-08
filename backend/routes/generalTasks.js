import { Router } from 'express';
import { getGeneralTasks, toggleGeneralTask } from '../controllers/generalTaskController.js';
import protect from '../middleware/auth.js';

const router = Router();
router.get('/',               protect, getGeneralTasks);
router.patch('/:id/complete', protect, toggleGeneralTask);
export default router;