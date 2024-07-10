const db = require('../utils/mysql');

const createLostObject = async (name, location, date, photo, description) => {
    const sql = 'INSERT INTO lost_objects (name, location, date, photo, description) VALUES (?, ?, ?, ?, ?)';
    const result = await db.query(sql, [name, location, date, photo, description]);
    return result.insertId;
};

module.exports = {
    createLostObject
};
