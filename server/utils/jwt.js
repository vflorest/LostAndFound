const jwt = require('jsonwebtoken');
const config = require('../config/config');

function sign(payload) {
    return jwt.sign(payload, config.jwt.secret, { expiresIn: '1h' });
}

function verify(token) {
    return jwt.verify(token, config.jwt.secret);
}

module.exports = {
    sign,
    verify
};
