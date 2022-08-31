import { Router } from 'express';
import { getLackingArticles, getRepairs, getPendingPaids } from '../controllers/reportsController';

const router = Router();

router.post('/lacking_articles', getLackingArticles);
router.post('/repairs', getRepairs);
router.post('/pending_paids', getPendingPaids);

export default router;