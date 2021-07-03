"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const userController_1 = require("../controllers/userController");
const validateFields_1 = require("../middlewares/validateFields");
const validateJwt_1 = require("../middlewares/validateJwt");
const validateRole_1 = require("../middlewares/validateRole");
const dbValidators_1 = require("../helpers/dbValidators");
const router = express_1.Router();
router.get('/:id', userController_1.getUser);
router.get('/', userController_1.getUsers);
router.post('/', [
    express_validator_1.check('name', 'Field "name" is required').not().isEmpty(),
    express_validator_1.check('password', 'Field "password" is required').not().isEmpty(),
    express_validator_1.check('email', 'Enter a valid email').isEmail(),
    express_validator_1.check('email').custom(dbValidators_1.checkEmail),
    validateFields_1.validateFields
], userController_1.createUser);
router.put('/:id', [
    validateJwt_1.validateJWT,
    validateRole_1.isAdminRole,
    express_validator_1.check('name', 'Field "name" is required').not().isEmpty(),
    express_validator_1.check('password', 'Field "password" is required').not().isEmpty(),
    express_validator_1.check('email', 'Enter a valid email').isEmail(),
    express_validator_1.check('email').custom(dbValidators_1.checkEmail),
    validateFields_1.validateFields
], userController_1.updateUser);
router.delete('/:id', [
    validateJwt_1.validateJWT,
    validateRole_1.isAdminRole,
], userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRoute.js.map