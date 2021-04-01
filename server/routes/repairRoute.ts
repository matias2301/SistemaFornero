import { Router } from 'express';
import { getRepairs } from '../controllers/repairController';

const router = Router();

router.get('/', getRepairs );

export default router;