"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validateFields_1 = require("../middlewares/validateFields");
const authController_1 = require("../controllers/authController");
const router = express_1.Router();
router.post('/', [
    express_validator_1.check('email', 'Enter a valid email').isEmail(),
    express_validator_1.check('password', 'Field "password" is required').not().isEmpty(),
    validateFields_1.validateFields
], authController_1.login);
exports.default = router;
//# sourceMappingURL=authRoute.js.map