const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-practice', 'root', 'ericfei306', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;
