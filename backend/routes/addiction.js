import { Router } from 'express';
import { detectFromQuiz, saveKnownAddictions } from '../controllers/addictionController.js';
import protect from '../middleware/auth.js';

const router = Router();

router.post('/quiz',  protect, detectFromQuiz);
router.post('/known', protect, saveKnownAddictions);

export default router;