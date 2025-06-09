// models/holiday.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // adjust the path to your Sequelize config

  const Holiday = sequelize.define('Holiday', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM('Festival', 'Religious', 'National'),
      allowNull: false,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    organizationList: {
      type: DataTypes.ARRAY(DataTypes.STRING),  // ✅ ARRAY of strings
      allowNull: true,
      defaultValue: [],
    }
  }, {
    tableName: 'holidays',
    timestamps: true,
  });



module.exports = Holiday;