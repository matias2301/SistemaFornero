"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientController_1 = require("../controllers/clientController");
const express_validator_1 = require("express-validator");
const validateFields_1 = require("../middlewares/validateFields");
const validateJwt_1 = require("../middlewares/validateJwt");
const validateRole_1 = require("../middlewares/validateRole");
const router = express_1.Router();
router.get('/:id', clientController_1.getClient);
router.get('/', clientController_1.getClients);
router.post('/', [
    express_validator_1.check('firstName', 'Field "firstName" is required').not().isEmpty(),
    express_validator_1.check('lastName', 'Field "lastName" is required').not().isEmpty(),
    express_validator_1.check('email', 'Enter a valid email').isEmail(),
    express_validator_1.check('phone', 'Field "phone" is required').not().isEmpty(),
    express_validator_1.check('streetName', 'Field "streetName" is required').not().isEmpty(),
    express_validator_1.check('streetNumber', 'Field "streetNumber" is required').not().isEmpty(),
    express_validator_1.check('city', 'Field "city" is required').not().isEmpty(),
    express_validator_1.check('state', 'Field "state" is required').not().isEmpty(),
    express_validator_1.check('country', 'Field "country" is required').not().isEmpty(),
    validateFields_1.validateFields
], clientController_1.createClient);
router.put('/:id', [
    validateJwt_1.validateJWT,
    validateRole_1.isAdminRole,
    express_validator_1.check('firstName', 'Field "firstName" is required').not().isEmpty(),
    express_validator_1.check('lastName', 'Field "lastName" is required').not().isEmpty(),
    express_validator_1.check('email', 'Enter a valid email').isEmail(),
    express_validator_1.check('phone', 'Field "phone" is required').not().isEmpty(),
    express_validator_1.check('streetName', 'Field "streetName" is required').not().isEmpty(),
    express_validator_1.check('streetNumber', 'Field "streetNumber" is required').not().isEmpty(),
    express_validator_1.check('city', 'Field "city" is required').not().isEmpty(),
    express_validator_1.check('state', 'Field "state" is required').not().isEmpty(),
    express_validator_1.check('country', 'Field "country" is required').not().isEmpty(),
    validateFields_1.validateFields
], clientController_1.updateClient);
router.delete('/:id', [
    validateJwt_1.validateJWT,
    validateRole_1.isAdminRole,
], clientController_1.deleteClient);
exports.default = router;
//# sourceMappingURL=clientRoute.js.map