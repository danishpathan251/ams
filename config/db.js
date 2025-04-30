const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'postgres',
  'postgres',
  'danish',
  {
    host: '43.204.112.24',
    port: 5432,
    dialect: 'postgres',
    logging: false, // Optional: disable SQL logging
  }
);

// Test connection
sequelize.authenticate()
  .then(() => console.log('✅ DB connected successfully'))
  .catch((err) => console.error('❌ DB connection failed:', err));

module.exports = sequelize;
