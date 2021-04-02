import { Router } from 'express';
import { getProvider, getProviders, createProvider, updateProvider, deleteProvider } from '../controllers/providerController';

import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields';
import { validateJWT } from '../middlewares/validateJwt';
import { isAdminRole, hasRole } from '../middlewares/validateRole';

const router = Router();

router.get('/:id', getProvider );
router.get('/', getProviders );

router.post('/', [
    check('name', 'Field "name" is required').not().isEmpty(),
    check('lastName', 'Field "lastName" is required').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('phone', 'Field "phone" is required').not().isEmpty(),
    check('city', 'Field "city" is required').not().isEmpty(),
    check('state', 'Field "state" is required').not().isEmpty(),
    check('country', 'Field "country" is required').not().isEmpty(),
    validateFields
], createProvider );

router.put('/:id', [
    validateJWT,
    isAdminRole,
    validateFields
], updateProvider );

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    validateFields
], deleteProvider );

export default router;