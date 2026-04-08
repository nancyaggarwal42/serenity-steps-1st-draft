import { Router } from 'express';
import { getTasks, toggleTask } from '../controllers/taskController.js';
import protect from '../middleware/auth.js';

const router = Router();

router.get('/',           protect, getTasks);
router.patch('/:id/complete', protect, toggleTask);

export default router;