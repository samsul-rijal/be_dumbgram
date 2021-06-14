const express = require('express')

const router = express.Router()

const { registrasi } = require('../controllers/register')
const { login } = require('../controllers/login')
const { users, updateUser, deleteUser } = require('../controllers/users')
const { followers } = require('../controllers/follows')

const { auth } = require('../middleware/auth')

router.post('/register', registrasi)
router.post('/login', login)
router.get('/users', users)
router.patch('/users/:id', auth, updateUser)
router.delete('/users/:id', deleteUser)
router.get('/followers', followers)

module.exports = router