const express = require('express')
const router = express.Router()


const TaskAdd = require('../controllers/TaskAdd')
const TaskGet = require('../controllers/TaskGet')
const TaskUpdate = require('../controllers/TaskUpdate.js')
const TaskDelete = require('../controllers/TaskDelete.js')
const GetUpdateTask = require('../controllers/GetUpdateTask.js')


router.route('/tasks').post(TaskAdd)
router.route('/tasks').get(TaskGet)
router.route('/tasks/:id').put(TaskUpdate); 
router.route('/tasks/:id').delete(TaskDelete);
router.route('/tasks/:id').get(GetUpdateTask);

module.exports = router;