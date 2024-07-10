const express = require('express');
const requestsController = require('../controllers/requestController');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/create', upload.single('file'), requestsController.createRequest);
router.get('/requests', requestsController.getRequests);

module.exports = router;