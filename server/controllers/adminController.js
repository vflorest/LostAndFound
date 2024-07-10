const db = require('../utils/mysql');

const registerLostObject = async (req, res) => {
    const { name, description, file } = req.body;
    // Aquí deberías manejar la lógica para guardar el archivo
    await db.query('INSERT INTO lost_objects (name, description, photo) VALUES (?, ?, ?)', [name, description, file]);
    res.send({ message: 'Lost object registered successfully' });
};

const getLostObjects = async (req, res) => {
    const lostObjects = await db.query('SELECT * FROM lost_objects');
    res.send(lostObjects);
};

const getRequests = async (req, res) => {
    const requests = await db.query('SELECT * FROM requests');
    res.send(requests);
};

const createRequest = async (req, res) => {
    const { name, description, file } = req.body;
    const userId = req.userId;
    // Aquí deberías manejar la lógica para guardar el archivo
    await db.query('INSERT INTO requests (user_id, name, description, photo) VALUES (?, ?, ?, ?)', [userId, name, description, file]);
    res.send({ message: 'Request created successfully' });
};

module.exports = {
    registerLostObject,
    getLostObjects,
    getRequests,
    createRequest
};
