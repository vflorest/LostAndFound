// authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../utils/mysql');

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    res.send({ message: 'User registered successfully' });
};

const registerAdmin = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO admins (email, password) VALUES (?, ?)', [email, hashedPassword]);
    res.send({ message: 'Admin registered successfully' });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) return res.status(404).send({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) return res.status(401).send({ message: 'Invalid password' });

    const token = jwt.sign({ id: user[0].id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.send({ token, user: user[0] });
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    const admin = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (admin.length === 0) return res.status(404).send({ message: 'Admin not found' });

    const validPassword = await bcrypt.compare(password, admin[0].password);
    if (!validPassword) return res.status(401).send({ message: 'Invalid password' });

    const token = jwt.sign({ id: admin[0].id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.send({ token, admin: admin[0] });
};

module.exports = {
    registerUser,
    registerAdmin,
    loginUser,
    loginAdmin
};
