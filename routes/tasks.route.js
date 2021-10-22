const express = require('express');
const router = express.Router();

const { getAllTasks, 
        getTask,
        createTask,
        updateTask,
        deleteTask 
} = require('../controllers/tasks.controller');

router.route('/').post(createTask).get(getAllTasks);
router.route('/:id').get(getTask).delete(deleteTask).patch(updateTask);

module.exports = router;