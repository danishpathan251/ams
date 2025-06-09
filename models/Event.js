 
const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database'); // adjust the path to your DB config
const sequelize = require('../config/db'); // adjust the path to your Sequelize config



 const Event = sequelize.define('Event', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,  // behaves like SERIAL
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    createdBy: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'events',
    timestamps: true, // adds createdAt and updatedAt
  });

  module.exports = Event;