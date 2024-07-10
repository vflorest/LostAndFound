const LostObjectModel = require('../models/LostObjectModel');

const registerLostObject = async (req, res) => {
    const { name, location, date, photo, description } = req.body;

    try {
        const id = await LostObjectModel.createLostObject(name, location, date, photo, description);
        res.status(201).json({ message: 'Lost object registered successfully', id });
    } catch (error) {
        res.status(500).json({ message: 'Error registering lost object', error: error.message });
    }
};

module.exports = {
    registerLostObject
};
