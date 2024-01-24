const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const User = sequelize.define('users', {
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },

}, {
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ],
});

module.exports = {
    User
};
