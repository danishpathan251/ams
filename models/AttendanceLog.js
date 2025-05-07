// /AttendanceLog.js

module.exports = (sequelize, DataTypes) => {
  const AttendanceLog = sequelize.define('AttendanceLog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    log_type: {
      type: DataTypes.ENUM('check-in', 'check-out', 'break-in', 'break-out'),
      allowNull: false,
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
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'attendance_logs',
    timestamps: false,
  });

  // Automatically set the 'date' field based on 'timestamp'
  AttendanceLog.beforeCreate((log) => {
    if (!log.date && log.timestamp) {
      log.date = new Date(log.timestamp).toISOString().split('T')[0];
    }
  });

  return AttendanceLog;
};
