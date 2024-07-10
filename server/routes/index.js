// index.js
const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes); // Ya que userRoutes tiene el middleware aplicado en cada ruta
router.use('/admin', adminRoutes); // Ya que adminRoutes tiene el middleware aplicado en cada ruta

module.exports = router;
