 models/business.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // adjust the path to your DB config

const Business = sequelize.define('Business', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  businessId: {
    type: DataTypes.STRING, // Or UUID if you're using UUIDs
    allowNull: false,
    unique: true,
  },
  businessname: {
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
    type: DataTypes.STRING, // VARCHAR to support leading zeros
    allowNull: false,
  },
}, {
  tableName: 'businesses',
  timestamps: true,
});

module.exports = Business;

// models