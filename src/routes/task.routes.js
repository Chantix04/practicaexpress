const routerTasks = require('express').Router();

const {
    getTasks,
    postTasks,
    putTasks,
    deleteTasks
} = require('../controllers/tasks.controllers');

routerTasks.get('/tasks', getTasks)
routerTasks.post('/tasks', postTasks)
routerTasks.put('/tasks/:id', putTasks)
routerTasks.delete('/tasks/:id', deleteTasks)

module.exports = routerTasks;