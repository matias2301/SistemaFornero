import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields } from '../middlewares/validateFields';

import { login } from '../controllers/authController';


const router = Router();

router.post('/',[
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Field "password" is required').not().isEmpty(),
    validateFields
],login );


export default router;