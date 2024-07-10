const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/me', verifyToken, userController.getUserProfile);
router.put('/me', verifyToken, userController.updateUserProfile);
router.get('/requests', verifyToken, userController.getUserRequests);

module.exports = router;
