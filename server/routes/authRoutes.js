const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

console.log('Auth Controller:', authController); // Debug

router.post('/register', authController.registerUser);
router.post('/register-admin', authController.registerAdmin);
router.post('/login', authController.loginUser);
router.post('/admin-login', authController.loginAdmin);

module.exports = router;
