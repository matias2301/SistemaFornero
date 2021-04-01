import { Router } from 'express';
import { getProviders } from '../controllers/providerController';

const router = Router();

router.get('/', getProviders );

export default router;