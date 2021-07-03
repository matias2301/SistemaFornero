"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const observationController_1 = require("../controllers/observationController");
const express_validator_1 = require("express-validator");
const validateFields_1 = require("../middlewares/validateFields");
const validateJwt_1 = require("../middlewares/validateJwt");
const validateRole_1 = require("../middlewares/validateRole");
const router = express_1.Router();
router.post('/', [
    express_validator_1.check('RepairId', 'Field "repairId" is required').not().isEmpty(),
    express_validator_1.check('description', 'Field "description" is required').not().isEmpty(),
    validateFields_1.validateFields
], observationController_1.createObservations);
router.delete('/:id', [
    validateJwt_1.validateJWT,
    validateRole_1.isAdminRole,
], observationController_1.deleteObservations);
exports.default = router;
//# sourceMappingURL=observationRoute.js.map