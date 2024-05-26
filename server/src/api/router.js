const express = require('express');
const userController = require('./controllers/user-controller');
const friendshipController = require('./controllers/friendship-controller');
const { verifyToken } = require('./middlewares/auth-middleware');

const router = express.Router();

router.post('/api/register', userController.register);
router.post('/api/login', userController.login);
router.get('/api/profile/me', verifyToken, userController.getMyProfile);
router.get('/api/friends', verifyToken, userController.getMyFriends);
router.get('/api/:id', verifyToken, userController.getUserData);
router.get('/api/users/search', verifyToken, userController.searchUsersByName);
router.get('/api/visitors', verifyToken, userController.getAllVisitors);
// router.post('/initiate-friendship', verifyToken, friendshipController.initiateFriendship);
// router.post('/confirm-friendship', verifyToken, friendshipController.confirmFriendship);
// router.get('/friendship-requests', verifyToken, friendshipController.getFriendshipRequests);

module.exports = router;
