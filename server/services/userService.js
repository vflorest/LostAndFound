const db = require('../utils/mysql');
const bcrypt = require('bcrypt');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

async function createAdmin(email, password) {
    if (!validateEmail(email)) {
        throw new Error('Invalid email format');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, hashedPassword, 'admin']);
}

module.exports = {
    createAdmin,
};
