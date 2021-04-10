import { Router } from 'express';
import { getArticle, getArticles, createArticle, updateArticle, deleteArticle } from '../controllers/articleController';

import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields';
import { validateJWT } from '../middlewares/validateJwt';
import { isAdminRole, hasRole } from '../middlewares/validateRole';

const router = Router();

router.get('/:id',       getArticle );
router.get('/',    getArticles );

router.post('/', [
    check('code', 'Field "code" is required').not().isEmpty(),
    check('description', 'Field "description" is required').not().isEmpty(),
    check('price', 'Field "price" is required').not().isEmpty(),
    check('stock', 'Field "stock" is required').not().isEmpty(),
    validateFields
], createArticle );

router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('code', 'Field "code" is required').not().isEmpty(),
    check('description', 'Field "description" is required').not().isEmpty(),
    check('price', 'Field "price" is required').not().isEmpty(),
    check('stock', 'Field "stock" is required').not().isEmpty(),
    validateFields
], updateArticle );

router.delete('/:id', [
    validateJWT,
    isAdminRole,    
], deleteArticle );

export default router;