const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('youtube-white-list', 'root', 'N0 z34zh-l0ly5h4D', {
    host: '127.0.0.1',
    dialect: 'mysql',
    // avoid created_at and updated_at
    timezone: '+08:00',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    //operatorsAliases: false
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection successful.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize