const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'ams',
  'postgres',
  'danish',
  {
    host: '65.1.243.104',
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
