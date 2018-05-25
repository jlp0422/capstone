const Sequelize = require('sequelize');

const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/capstone_db',
  {
    // logging: false
  }
);

module.exports = conn;
