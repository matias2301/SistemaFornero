"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const repairController_1 = require("../controllers/repairController");
const express_validator_1 = require("express-validator");
const validateFields_1 = require("../middlewares/validateFields");
const validateJwt_1 = require("../middlewares/validateJwt");
const validateRole_1 = require("../middlewares/validateRole");
const router = express_1.Router();
router.get('/:id', repairController_1.getRepair);
router.get('/', repairController_1.getRepairs);
router.post('/', [
    express_validator_1.check('description', 'Field "description" is required').not().isEmpty(),
    express_validator_1.check('state', 'Field "price" is required').not().isEmpty(),
    validateFields_1.validateFields
], repairController_1.createRepair);
router.put('/:id', [
    validateJwt_1.validateJWT,
    validateRole_1.isAdminRole,
    express_validator_1.check('description', 'Field "description" is required').not().isEmpty(),
    express_validator_1.check('state', 'Field "price" is required').not().isEmpty(),
    validateFields_1.validateFields
], repairController_1.updateRepair);
router.delete('/:id', [
    validateJwt_1.validateJWT,
    validateRole_1.isAdminRole,
], repairController_1.deleteRepair);
exports.default = router;
//# sourceMappingURL=repairRoute.js.map