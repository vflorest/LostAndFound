const db = require('../utils/mysql');
const bcrypt = require('bcrypt');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

async function registerUser(email, password) {
    if (!validateEmail(email)) {
        throw new Error('Invalid email format');
    }

    const users = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length > 0) {
        throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
}

async function registerAdmin(email, password) {
    if (!validateEmail(email)) {
        throw new Error('Invalid email format');
    }

    const admins = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (admins.length > 0) {
        throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO admins (email, password) VALUES (?, ?)', [email, hashedPassword]);
}

async function loginUser(email, password) {
    const users = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
        throw new Error('User not found');
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    return user;
}

async function loginAdmin(email, password) {
    const admins = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (admins.length === 0) {
        throw new Error('Admin not found');
    }

    const admin = admins[0];
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    return admin;
}

module.exports = {
    registerUser,
    registerAdmin,
    loginUser,
    loginAdmin
};
