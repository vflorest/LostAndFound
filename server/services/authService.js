const db = require('../utils/mysql');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');

async function register(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
}

async function login(email, password) {
    const users = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
        throw new Error('User not found');
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user.id });
    return token;
}

module.exports = {
    register,
    login
};
