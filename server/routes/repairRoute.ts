import { Router } from 'express';
import { getRepair, getRepairs, createRepair, updateRepair, deleteRepair } from '../controllers/repairController';

import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields';
import { validateJWT } from '../middlewares/validateJwt';
import { isAdminRole } from '../middlewares/validateRole';

const router = Router();

router.get('/:id', getRepair );
router.get('/', getRepairs );

router.post('/', [    
    check('description', 'Field "description" is required').not().isEmpty(),
    check('state', 'Field "price" is required').not().isEmpty(),    
    validateFields
], createRepair );

router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('description', 'Field "description" is required').not().isEmpty(),
    check('state', 'Field "price" is required').not().isEmpty(),    
    validateFields
], updateRepair );

router.delete('/:id', [
    validateJWT,    
    isAdminRole,    
], deleteRepair );

export default router;