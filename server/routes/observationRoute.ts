import { Router } from 'express';
import { getObservations } from '../controllers/observationController';

const router = Router();

router.get('/', getObservations );

export default router;