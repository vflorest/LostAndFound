const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('Authorization Header:', token); // Debug

    if (!token) {
        console.log('No token provided'); // Debug
        return res.status(403).send({ message: 'No token provided' });
    }

    jwt.verify(token.split(' ')[1], process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log('Token verification failed:', err.message); // Debug
            return res.status(401).send({ message: 'Unauthorized' });
        }
        console.log('Token verified, user ID:', decoded.id); // Debug
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;
