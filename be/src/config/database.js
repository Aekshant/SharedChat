const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect || 'postgres',
    port: config.port || 5432,
    logging: false,
  }
);

async function initDB() {
  try {
    await sequelize.authenticate();
    console.log('Postgres connected.');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
}

initDB();

module.exports = sequelize;
