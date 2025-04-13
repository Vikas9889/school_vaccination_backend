const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('school_vaccination', 'postgres', 'your_password', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

module.exports = sequelize;
