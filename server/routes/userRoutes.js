const express = require('express');
const userService = require('../services/userService');
const router = express.Router();

router.post('/create-admin', async (req, res) => {
    const { email, password } = req.body;
    try {
        await userService.createAdmin(email, password);
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
