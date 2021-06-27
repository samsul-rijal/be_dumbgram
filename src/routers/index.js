const express = require('express')

const router = express.Router()

const { registrasi } = require('../controllers/register')
const { login, checkAuth } = require('../controllers/login')
const { users, updateUser, deleteUser, getUser } = require('../controllers/users')
const { getFollowers, getFollowing } = require('../controllers/follows')
const { addFeed, getFeedByFollow, getAllFeed } = require('../controllers/feed')
const { addLike } = require('../controllers/like')
const { addComment, getComment } = require('../controllers/comment')
const { addMessage, getMessage } = require('../controllers/message')

const { addUser } = require('../controllers/addUser')

const auth  = require('../middleware/auth')
const { uploadFile } = require('../middleware/uploadFile')

router.post('/register', registrasi)
router.post('/login', login)
router.get("/check-auth",auth, checkAuth);

router.post('/add-user', uploadFile("imageFile"), addUser)

router.get('/user', auth, getUser)
router.get('/users', users)
router.patch('/users', auth, uploadFile("imageFile"), updateUser)
router.delete('/users/:id', deleteUser)

router.get('/followers/:id', getFollowers)
router.get('/following/:id', getFollowing)

router.post('/feed', auth, uploadFile("imageFile"), addFeed)
router.get('/feed', auth, getFeedByFollow)
router.get('/feeds', auth, getAllFeed)
router.post('/like', auth, addLike)
router.post('/comments', auth, addComment)
router.get('/comments/:feedId', auth, getComment)

router.post('/message/:idSendTo', auth, addMessage)
router.get('/message-user/:idSendTo', auth, getMessage)

module.exports = router