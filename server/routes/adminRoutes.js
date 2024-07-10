const express = require('express');
const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register-lost-object', verifyToken, adminController.registerLostObject);
router.get('/lost-objects', verifyToken, adminController.getLostObjects);
router.get('/requests', verifyToken, adminController.getRequests);
router.post('/create-request', verifyToken, adminController.createRequest);

module.exports = router;
