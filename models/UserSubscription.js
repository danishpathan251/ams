// models/userSubscription.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const AttendancePlan = require('./AttendancePlan');
const User = require('./User'); // your existing User model

class UserSubscription extends Model {}

UserSubscription.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  plan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: AttendancePlan,
      key: 'id'
    }
  },
  start_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'UserSubscription',
  tableName: 'user_subscriptions',
  timestamps: false,
  underscored: true
});

// Define associations
AttendancePlan.hasMany(UserSubscription, { foreignKey: 'plan_id', as: 'subscriptions' });
UserSubscription.belongsTo(AttendancePlan, { foreignKey: 'plan_id', as: 'plan' });

User.hasMany(UserSubscription, { foreignKey: 'user_id', as: 'subscriptions' });
UserSubscription.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = UserSubscription;
