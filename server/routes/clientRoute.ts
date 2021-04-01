import { Router } from 'express';
import { getClients } from '../controllers/clientController';

const router = Router();

router.get('/', getClients );

export default router;