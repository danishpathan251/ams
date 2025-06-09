const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // adjust the path to your Sequelize config


  const LeaveRequest = sequelize.define('LeaveRequest', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // SERIAL behavior
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    leaveType: {
      type: DataTypes.ENUM('Sick Leave', 'Casual Leave', 'Annual Leave', 'Maternity Leave'),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Rejected', 'Cancelled'),
      defaultValue: 'Pending',
    },
    organizationList: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    }
  }, {
    tableName: 'leave_requests',
    timestamps: true, // adds createdAt and updatedAt
  });


module.exports = LeaveRequest;

