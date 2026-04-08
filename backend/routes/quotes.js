import { Router } from 'express';
import { getDailyQuote } from '../controllers/quoteController.js';
import protect from '../middleware/auth.js';

const router = Router();
router.get('/', protect, getDailyQuote);
export default router;