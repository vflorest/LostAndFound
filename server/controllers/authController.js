const authService = require('../services/authService');

async function register(req, res) {
    const { email, password } = req.body;
    try {
        await authService.register(email, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const token = await authService.login(email, password);
        res.json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    register,
    login
};
