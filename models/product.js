const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    title: DataTypes.STRING,
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Product;
