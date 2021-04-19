import { Router } from 'express';
import { check } from 'express-validator';
import { getUser, getUsers, createUser, updateUser, deleteUser } from '../controllers/userController';

import { validateFields } from '../middlewares/validateFields';
import { validateJWT } from '../middlewares/validateJwt';
import { isAdminRole, hasRole } from '../middlewares/validateRole';
import { checkEmail } from '../helpers/dbValidators';


const router = Router();

router.get('/:id', getUser );
router.get('/', getUsers );

router.post('/', [
    check('name', 'Field "name" is required').not().isEmpty(),
    check('password', 'Field "password" is required').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('email').custom( checkEmail ),
    validateFields
], createUser );

router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('name', 'Field "name" is required').not().isEmpty(),
    check('password', 'Field "password" is required').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('email').custom( checkEmail ),
    validateFields
], updateUser );

router.delete('/:id', [
    validateJWT,
    isAdminRole,    
], deleteUser );


export default router;