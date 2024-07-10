const express = require('express');
const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/register-lost-object', verifyToken, upload.single('file'), adminController.registerLostObject);
router.get('/lost-objects', verifyToken, adminController.getLostObjects);

module.exports = router;
