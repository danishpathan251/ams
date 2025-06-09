const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // adjust as needed
const AttendanceLog = sequelize.define('AttendanceLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'employee_id', // maps to DB column
  },
  logType: {
    type: DataTypes.ENUM('check-in', 'check-out', 'break-in', 'break-out'),
    allowNull: false,
    field: 'log_type',
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'attendance_logs',
  timestamps: false,
});


// Set the 'date' and 'time' based on 'timestamp' if not provided
AttendanceLog.beforeCreate((log) => {
  if (!log.date && log.timestamp) {
    log.date = log.timestamp.toISOString().split('T')[0];
  }
  if (!log.time && log.timestamp) {
    log.time = log.timestamp.toTimeString().split(' ')[0];
  }
});

module.exports = AttendanceLog;
