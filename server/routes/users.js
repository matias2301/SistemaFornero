const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { check } = require('express-validator');

router.post('/',
    [
        check('name', 'Field name is required').not().isEmpty(),
        check('email', 'Enter a valid email').isEmail(),
        check('password','Password must has at least six characters').isLength({ min: 6 })
    ],
    userController.createUser);

module.exports = router;