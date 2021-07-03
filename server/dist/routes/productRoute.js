"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const express_validator_1 = require("express-validator");
const validateFields_1 = require("../middlewares/validateFields");
const validateJwt_1 = require("../middlewares/validateJwt");
const validateRole_1 = require("../middlewares/validateRole");
const router = express_1.Router();
router.get('/:id', productController_1.getProduct);
router.get('/', productController_1.getProducts);
router.post('/', [
    express_validator_1.check('code', 'Field "code" is required').not().isEmpty(),
    express_validator_1.check('description', 'Field "description" is required').not().isEmpty(),
    express_validator_1.check('price', 'Field "price" is required').not().isEmpty(),
    express_validator_1.check('stock', 'Field "stock" is required').not().isEmpty(),
    validateFields_1.validateFields
], productController_1.createProduct);
router.put('/:id', [
    validateJwt_1.validateJWT,
    validateRole_1.isAdminRole,
    express_validator_1.check('code', 'Field "code" is required').not().isEmpty(),
    express_validator_1.check('description', 'Field "description" is required').not().isEmpty(),
    express_validator_1.check('price', 'Field "price" is required').not().isEmpty(),
    express_validator_1.check('stock', 'Field "stock" is required').not().isEmpty(),
    validateFields_1.validateFields
], productController_1.updateProduct);
router.delete('/:id', [
    validateJwt_1.validateJWT,
    validateRole_1.isAdminRole,
], productController_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=productRoute.js.map