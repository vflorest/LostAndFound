const express = require('express');
const authRoutes = require('./authRoutes');
const lostObjectRoutes = require('./lostObjectRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/lost-objects', lostObjectRoutes);

module.exports = router;
