const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const OrderItem = sequelize.define('orderItem', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    quantity: DataTypes.INTEGER,
});

module.exports = OrderItem;
