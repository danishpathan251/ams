// models/attendancePlan.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db'); // adjust the path to your sequelize instance

class AttendancePlan extends Model {}

AttendancePlan.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  plan_type: {
    type: DataTypes.ENUM('monthly', 'yearly'),
    allowNull: false,
    defaultValue: 'monthly'
  },
  max_businesses: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  max_stores: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  max_employees: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'AttendancePlan',
  tableName: 'attendance_plans',
  timestamps: false,
  underscored: true
});

module.exports = AttendancePlan;


