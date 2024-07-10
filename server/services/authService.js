const db = require('../utils/mysql');
const bcrypt = require('bcrypt');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

async function registerUser(email, password) {
    console.log('registerUser called with:', email);
    if (!validateEmail(email)) {
        throw new Error('Invalid email format');
    }

    const users = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length > 0) {
        throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    console.log('User registered:', email);
}

async function registerAdmin(email, password) {
    console.log('registerAdmin called with:', email);
    if (!validateEmail(email)) {
        throw new Error('Invalid email format');
    }

    const admins = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (admins.length > 0) {
        throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO admins (email, password) VALUES (?, ?)', [email, hashedPassword]);
    console.log('Admin registered:', email);
}

async function loginUser(email, password) {
    console.log('loginUser called with:', email);
    const users = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
        throw new Error('User not found');
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    console.log('User logged in:', email);
    return user;
}

async function loginAdmin(email, password) {
    console.log('loginAdmin called with:', email);
    const admins = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (admins.length === 0) {
        throw new Error('Admin not found');
    }

    const admin = admins[0];
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    console.log('Admin logged in:', email);
    return admin;
}

module.exports = {
    registerUser,
    registerAdmin,
    loginUser,
    loginAdmin
};
