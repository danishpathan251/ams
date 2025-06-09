const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserEvents = sequelize.define('UserEvents', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    primaryKey: true,
  },
  eventId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'events',
      key: 'id',
    },
    primaryKey: true,
  }
}, {
  tableName: 'user_events',
  timestamps: false,
});

module.exports = UserEvents;
