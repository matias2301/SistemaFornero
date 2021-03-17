const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const authenticate = require('../middleware/authenticate');
const { check } = require('express-validator');

router.post('/',
    authenticate,
    [
        check('name', 'Field name is required').not().isEmpty()
    ],
    projectController.createProject
);

router.get('/',
    authenticate,
    projectController.getProjects
);

router.put('/:id',
    authenticate,
    [
        check('name', 'Field name is required').not().isEmpty()
    ],
    projectController.updateProject
);

router.delete('/:id',
    authenticate,
    projectController.deleteProject
);

module.exports = router;