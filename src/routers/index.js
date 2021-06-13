const express = require('express')

const router = express.Router()

const { registrasi } = require('../controllers/register')
const { login } = require('../controllers/login')

router.post('/register', registrasi)
router.post('/login', login)

module.exports = router