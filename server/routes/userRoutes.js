const express = require('express');
const userController = require('../controllers/userController');
const requestsController = require('../controllers/requestController');
const upload = require('../middleware/upload');
const verifyToken = require('../middleware/authenticateToken');
const router = express.Router();

router.get('/me', verifyToken, userController.getUserProfile);
router.put('/me', verifyToken, userController.updateUserProfile);
router.get('/requests', verifyToken, userController.getUserRequests);

// Incluir las rutas de solicitudes con middleware de carga de archivos
router.post('/register-request', verifyToken, upload.single('file'), requestsController.createRequest);

module.exports = router;
