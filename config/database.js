const {Sequelize} = require('sequelize');

const db = new Sequelize('exc2c6', 'root', '', {
    host : 'localhost',
    dialect : 'mysql'
});

module.exports = db;