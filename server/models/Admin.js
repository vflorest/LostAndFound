const { DataTypes } = require('sequelize');
const sequelize = require('../utils/mysql');

const Admin = sequelize.define('Admin', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Admin;
