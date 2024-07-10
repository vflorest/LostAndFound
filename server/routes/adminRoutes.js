// adminRoutes.js
const express = require('express');
const adminController = require('../controllers/adminController');
const requestsRoutes = require('./requestRoutes');
const verifyToken = require('../middleware/authenticateToken'); // Corrected path
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/register-lost-object', verifyToken, upload.single('file'), adminController.registerLostObject);
router.get('/lost-objects', verifyToken, adminController.getLostObjects);
router.delete('/lost-objects/:id', verifyToken, adminController.deleteLostObject);

router.use('/requests', verifyToken, requestsRoutes);

module.exports = router;
