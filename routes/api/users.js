const express = require('express')
const router = express.Router()
const userController = require('../../controllers/api/users')

router.post('/', userController.createUser)
router.post('/login', userController.loginUser)// /api/users/login
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.auth, userController.deleteUser)

module.exports = router