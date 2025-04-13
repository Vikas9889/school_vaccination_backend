const { Sequelize } = require('sequelize');

// Sequelize connection to the database
const sequelize = new Sequelize('school_vaccination', 'postgres', 'Abc@123', {
  host: 'localhost',
  dialect: 'postgres',  // Make sure 'postgres' is passed as a string
  port: 5432,
});

// Sync models (optional, based on your needs)
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

module.exports = sequelize;
