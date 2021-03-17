const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const authenticate = require('../middleware/authenticate');
const { check } = require('express-validator');

router.post('/',
    authenticate,
    [
        check('name','Field name is required').not().isEmpty(),
        check('projectId','Field name is required').not().isEmpty()
    ],
    taskController.createTask
);

router.get('/',
    authenticate,
    taskController.getTasks
);

router.put('/:id',
    authenticate,
    taskController.updateTask
);

router.delete('/:id',
    authenticate,
    taskController.deleteTask
);

module.exports = router;