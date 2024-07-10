const db = require('../utils/mysql');

const createRequest = async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user.id; // Obtener el user_id del token de autenticación
    let fileName = null;
    if (req.file) {
        fileName = req.file.filename;
    }
    const createdAt = new Date();
    const status = 'pending';
    try {
        await db.query('INSERT INTO requests (user_id, name, description, photo, status, created_at) VALUES (?, ?, ?, ?, ?, ?)', [userId, name, description, fileName, status, createdAt]);
        res.send({ message: 'Request created successfully' });
    } catch (err) {
        console.error('Error creating request:', err);
        res.status(500).send({ message: 'Error creating request' });
    }
};

const getRequests = async (req, res) => {
    try {
        const requests = await db.query('SELECT * FROM requests');
        res.send(requests);
    } catch (err) {
        console.error('Error getting requests:', err);
        res.status(500).send({ message: 'Error getting requests' });
    }
};

module.exports = {
    createRequest,
    getRequests
};
