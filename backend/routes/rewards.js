import { Router } from 'express';
import { getWeeklyProgress, claimReward } from '../controllers/rewardController.js';
import protect from '../middleware/auth.js';

const router = Router();

router.get('/',      protect, getWeeklyProgress);
router.post('/claim', protect, claimReward);

export default router;