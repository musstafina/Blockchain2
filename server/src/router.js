const express = require('express');
const userController = require('./controllers/user-controller');
const { verifyToken } = require('./middlewares/auth-middleware');

const router = express.Router();

router.post('/api/register', userController.register)
router.post('/api/login', userController.login)
router.get('/api/profile/me', verifyToken, userController.getMyProfile);
router.get('/api/friends', verifyToken, userController.getMyFriends);
router.get('/api/:id', verifyToken, userController.getUserData); 

module.exports = router;