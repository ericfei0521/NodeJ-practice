const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const CartItem = sequelize.define('cartItem', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
});

module.exports = CartItem;
