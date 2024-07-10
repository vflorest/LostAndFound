const db = require('../utils/mysql');

const getUserProfile = async (req, res) => {
    const userId = req.userId;
    const users = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
        return res.status(404).send({ message: 'User not found' });
    }
    res.send(users[0]);
};

const updateUserProfile = async (req, res) => {
    const userId = req.userId;
    const { name } = req.body;
    await db.query('UPDATE users SET name = ? WHERE id = ?', [name, userId]);
    res.send({ message: 'Profile updated successfully' });
};

const getUserRequests = async (req, res) => {
    const userId = req.userId;
    const requests = await db.query('SELECT * FROM requests WHERE user_id = ?', [userId]);
    res.send(requests);
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    getUserRequests
};
