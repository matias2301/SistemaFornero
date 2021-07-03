"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const providerController_1 = require("../controllers/providerController");
const express_validator_1 = require("express-validator");
const validateFields_1 = require("../middlewares/validateFields");
const validateJwt_1 = require("../middlewares/validateJwt");
const validateRole_1 = require("../middlewares/validateRole");
const router = express_1.Router();
router.get('/:id', providerController_1.getProvider);
router.get('/', providerController_1.getProviders);
router.post('/', [
    express_validator_1.check('name', 'Field "name" is required').not().isEmpty(),
    express_validator_1.check('email', 'Enter a valid email').isEmail(),
    express_validator_1.check('phone', 'Field "phone" is required').not().isEmpty(),
    express_validator_1.check('city', 'Field "city" is required').not().isEmpty(),
    express_validator_1.check('state', 'Field "state" is required').not().isEmpty(),
    express_validator_1.check('country', 'Field "country" is required').not().isEmpty(),
    validateFields_1.validateFields
], providerController_1.createProvider);
router.put('/:id', [
    validateJwt_1.validateJWT,
    validateRole_1.isAdminRole,
    express_validator_1.check('name', 'Field "name" is required').not().isEmpty(),
    express_validator_1.check('email', 'Enter a valid email').isEmail(),
    express_validator_1.check('phone', 'Field "phone" is required').not().isEmpty(),
    express_validator_1.check('city', 'Field "city" is required').not().isEmpty(),
    express_validator_1.check('state', 'Field "state" is required').not().isEmpty(),
    express_validator_1.check('country', 'Field "country" is required').not().isEmpty(),
    validateFields_1.validateFields
], providerController_1.updateProvider);
router.delete('/:id', [
    validateJwt_1.validateJWT,
    validateRole_1.isAdminRole,
], providerController_1.deleteProvider);
exports.default = router;
//# sourceMappingURL=providerRoute.js.map