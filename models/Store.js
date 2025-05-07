
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // adjust the path to your Sequelize config

const Store = sequelize.define('Store', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  businessId: {
    type: DataTypes.STRING, // Or DataTypes.UUID if your businesses use UUIDs
    allowNull: false,
  },
  storeId: {
    type: DataTypes.STRING, // Or UUID
    allowNull: false,
    unique: true,
  },
  storename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  areaname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  storetype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'stores',
  timestamps: true, // adds createdAt and updatedAt
});

module.exports = Store;

