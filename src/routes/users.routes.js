const router = require('express').Router();

const {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
} = require('../controllers/users.controllers');

router.get('/users', [] ,getUsers)
router.post('/users', [], postUsers)
router.put('/users/:id', [], putUsers)
router.delete('/users/:id', [], deleteUsers)

module.exports = router;