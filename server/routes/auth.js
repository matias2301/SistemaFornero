const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authenticate = require('../middleware/authenticate');
const { check } = require('express-validator');

router.post('/',
    authController.authenticateUser
);
router.get('/',
    authenticate,
    authController.getAuthenticatedUser    
);

module.exports = router;