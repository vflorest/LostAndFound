// adminController.js
const db = require('../utils/mysql');

const registerLostObject = async (req, res) => {
    const { name, location, description } = req.body;
    let fileName = null;
    if (req.file) {
        fileName = req.file.filename;
    }
    const createdAt = new Date();
    await db.query('INSERT INTO lost_objects (name, location, description, photo, created_at) VALUES (?, ?, ?, ?, ?)', [name, location, description, fileName, createdAt]);
    res.send({ message: 'Lost object registered successfully' });
};

const getLostObjects = async (req, res) => {
    const lostObjects = await db.query('SELECT * FROM lost_objects');
    res.send(lostObjects);
};

const deleteLostObject = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM lost_objects WHERE id = ?', [id]);
    res.send({ message: 'Lost object deleted successfully' });
}

module.exports = {
    registerLostObject,
    getLostObjects,
    deleteLostObject
};
