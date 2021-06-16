const express = require('express')

const router = express.Router()

const { registrasi } = require('../controllers/register')
const { login } = require('../controllers/login')
const { users, updateUser, deleteUser } = require('../controllers/users')
const { getFollowers, getFollowing } = require('../controllers/follows')
const { addFeed, getFeedByFollow, getAllFeed } = require('../controllers/feed')
const { addLike } = require('../controllers/like')
const { addComment, getComment } = require('../controllers/comment')

const auth  = require('../middleware/auth')

router.post('/register', registrasi)
router.post('/login', login)

router.get('/users', users)
router.patch('/users/:id', auth, updateUser)
router.delete('/users/:id', deleteUser)

router.get('/followers/:id', getFollowers)
router.get('/following/:id', getFollowing)

router.post('/feed', auth, addFeed)
router.get('/feed/:id', auth, getFeedByFollow)
router.get('/feeds', auth, getAllFeed)
router.post('/like', auth, addLike)
router.post('/comments', auth, addComment)
router.get('/comments/:feedId', auth, getComment)

module.exports = router