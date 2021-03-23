import { Router } from 'express';
import { check } from 'express-validator';
import { getUser, getUsers, createUser, updateUser, deleteUser } from '../controllers/userController';

import { validateFields } from '../middlewares/validateFields';
import { checkEmail } from '../helpers/dbValidators';


const router = Router();

router.get('/',       getUser );
router.get('/:id',    getUsers );

router.post('/', [
    check('name', 'Field "name" is required').not().isEmpty(),
    check('password', 'Field "password" is required').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('email').custom( checkEmail ),
    validateFields
], createUser );

router.put('/:id',    updateUser );
router.delete('/:id', deleteUser );


export default router;