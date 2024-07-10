const authService = require('../services/authService');

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('Registering user with email:', email);
        await authService.registerUser(email, password);
        res.status(201).send({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).send({ message: 'Error registering user', error: err.message });
    }
};

const registerAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('Registering admin with email:', email);
        await authService.registerAdmin(email, password);
        res.status(201).send({ message: 'Admin registered successfully' });
    } catch (err) {
        console.error('Error registering admin:', err);
        res.status(500).send({ message: 'Error registering admin', error: err.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('Logging in user with email:', email);
        const user = await authService.loginUser(email, password);
        res.send({ user });
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(400).send({ message: 'Email or password incorrect' });
    }
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('Logging in admin with email:', email);
        const admin = await authService.loginAdmin(email, password);
        res.send({ admin });
    } catch (err) {
        console.error('Error logging in admin:', err);
        res.status(400).send({ message: 'Email or password incorrect' });
    }
};

module.exports = {
    registerUser,
    registerAdmin,
    loginUser,
    loginAdmin
};
