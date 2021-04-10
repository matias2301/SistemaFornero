import { Router } from 'express';
import { getClient, getClients, createClient, updateClient, deleteClient } from '../controllers/clientController';

import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields';
import { validateJWT } from '../middlewares/validateJwt';
import { isAdminRole, hasRole } from '../middlewares/validateRole';

const router = Router();

router.get('/:id',       getClient );
router.get('/',    getClients );

router.post('/', [
    check('firstName', 'Field "firstName" is required').not().isEmpty(),
    check('lastName', 'Field "lastName" is required').not().isEmpty(),    
    check('email', 'Enter a valid email').isEmail(),
    check('phone', 'Field "phone" is required').not().isEmpty(),
    check('streetName', 'Field "streetName" is required').not().isEmpty(),
    check('streetNumber', 'Field "streetNumber" is required').not().isEmpty(),
    check('city', 'Field "city" is required').not().isEmpty(),
    check('state', 'Field "state" is required').not().isEmpty(),
    check('country', 'Field "country" is required').not().isEmpty(),
    validateFields
], createClient );

router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('firstName', 'Field "firstName" is required').not().isEmpty(),
    check('lastName', 'Field "lastName" is required').not().isEmpty(),    
    check('email', 'Enter a valid email').isEmail(),
    check('phone', 'Field "phone" is required').not().isEmpty(),
    check('streetName', 'Field "streetName" is required').not().isEmpty(),
    check('streetNumber', 'Field "streetNumber" is required').not().isEmpty(),
    check('city', 'Field "city" is required').not().isEmpty(),
    check('state', 'Field "state" is required').not().isEmpty(),
    check('country', 'Field "country" is required').not().isEmpty(),
    validateFields
], updateClient );

router.delete('/:id', [
    validateJWT,
    isAdminRole,    
], deleteClient );

export default router;