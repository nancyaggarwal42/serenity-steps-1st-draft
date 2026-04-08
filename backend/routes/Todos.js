import { Router } from 'express';
import { getTodos, createTodo, toggleTodo, deleteTodo } from '../controllers/TodoController.js';
import protect from '../middleware/auth.js';

const router = Router();

router.get('/',             protect, getTodos);
router.post('/',            protect, createTodo);
router.patch('/:id/toggle', protect, toggleTodo);
router.delete('/:id',       protect, deleteTodo);

export default router;