import { Router } from 'express';
import { createObservations, deleteObservations } from '../controllers/observationController';

import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields';
import { validateJWT } from '../middlewares/validateJwt';
import { isAdminRole } from '../middlewares/validateRole';


const router = Router();

router.post('/', [
    check('RepairId', 'Field "repairId" is required').not().isEmpty(),
    check('description', 'Field "description" is required').not().isEmpty(),
    validateFields
], createObservations );

router.delete('/:id', [
    validateJWT,
    isAdminRole,    
], deleteObservations );

export default router;