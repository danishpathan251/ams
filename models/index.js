const User = require('./User');
const Event = require('./Event');
const UserEvents = require('./UserEvents');

const models = { User, Event, UserEvents };

// Define associations

User.belongsToMany(Event, {
  through: UserEvents,
  foreignKey: 'userId',
  otherKey: 'eventId',
  as: 'events',
});

Event.belongsToMany(User, {
  through: UserEvents,
  foreignKey: 'eventId',
  otherKey: 'userId',
  as: 'users',
});

module.exports = models;
