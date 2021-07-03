"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articleController_1 = require("../controllers/articleController");
const express_validator_1 = require("express-validator");
const validateFields_1 = require("../middlewares/validateFields");
const validateJwt_1 = require("../middlewares/validateJwt");
const validateRole_1 = require("../middlewares/validateRole");
const router = express_1.Router();
router.get('/:id', articleController_1.getArticle);
router.get('/', articleController_1.getArticles);
router.post('/', [
    express_validator_1.check('code', 'Field "code" is required').not().isEmpty(),
    express_validator_1.check('description', 'Field "description" is required').not().isEmpty(),
    express_validator_1.check('price', 'Field "price" is required').not().isEmpty(),
    express_validator_1.check('stock', 'Field "stock" is required').not().isEmpty(),
    express_validator_1.check('poo', 'Field "point of order" is required').not().isEmpty(),
    validateFields_1.validateFields
], articleController_1.createArticle);
router.put('/:id', [
    validateJwt_1.validateJWT,
    validateRole_1.isAdminRole,
    express_validator_1.check('code', 'Field "code" is required').not().isEmpty(),
    express_validator_1.check('description', 'Field "description" is required').not().isEmpty(),
    express_validator_1.check('price', 'Field "price" is required').not().isEmpty(),
    express_validator_1.check('stock', 'Field "stock" is required').not().isEmpty(),
    express_validator_1.check('poo', 'Field "point of order" is required').not().isEmpty(),
    validateFields_1.validateFields
], articleController_1.updateArticle);
router.delete('/:id', [
    validateJwt_1.validateJWT,
    validateRole_1.isAdminRole,
], articleController_1.deleteArticle);
exports.default = router;
//# sourceMappingURL=articleRoute.js.map