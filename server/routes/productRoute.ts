import { Router } from 'express';
import { getProduct, getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController';

import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields';
import { validateJWT } from '../middlewares/validateJwt';
import { isAdminRole, hasRole } from '../middlewares/validateRole';

const router = Router();

router.get('/:id', getProduct );
router.get('/', getProducts );

router.post('/', [
    check('code', 'Field "code" is required').not().isEmpty(),
    check('description', 'Field "description" is required').not().isEmpty(),
    check('price', 'Field "price" is required').not().isEmpty(),
    check('stock', 'Field "stock" is required').not().isEmpty(),
    validateFields
], createProduct );

router.put('/:id', [
    validateJWT,
    isAdminRole,
    validateFields
], updateProduct );

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    validateFields
], deleteProduct );

export default router;