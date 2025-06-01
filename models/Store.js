
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // adjust the path to your Sequelize config

const Store = sequelize.define('Store', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  businessid: {
    type: DataTypes.STRING, // Or DataTypes.UUID if your businesses use UUIDs
    allowNull: false,
  },
  storeid: {
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
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  storetype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  geometry: {
    type: DataTypes.GEOMETRY,
    allowNull: false,
  },
}, {
  tableName: 'stores',
  timestamps: true, // adds createdAt and updatedAt
});

module.exports = Store;

