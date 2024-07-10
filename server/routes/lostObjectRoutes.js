const express = require('express');
const lostObjectController = require('../controllers/lostObjectController');

const router = express.Router();

router.post('/register', lostObjectController.registerLostObject);

module.exports = router;
