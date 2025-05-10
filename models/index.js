const Sequelize = require('sequelize');
const sequelize = require('../config/db'); // Import the Sequelize instance from db.js

// Import the models
const Student = require('./student')(sequelize);  // Initialize the Student model with the Sequelize instance
const Drive = require('./drive')(sequelize);  // Initialize the Drive model with the Sequelize instance
const VaccinationRecord = require('./vaccinationRecord')(sequelize);  // Initialize the VaccinationRecord model with the Sequelize instance

// Set up associations (optional, depending on your models)
Drive.hasMany(Student, { foreignKey: 'driveId' });  // For example, if a Drive has many Students
Student.belongsTo(Drive, { foreignKey: 'driveId' });  // If a Student belongs to a Drive

// Setup associations for VaccinationRecord
VaccinationRecord.belongsTo(Student, { foreignKey: 'studentId' });
VaccinationRecord.belongsTo(Drive, { foreignKey: 'driveId' });
Student.hasMany(VaccinationRecord, { foreignKey: 'studentId' });
Drive.hasMany(VaccinationRecord, { foreignKey: 'driveId' });

// Export the models and the sequelize instance
module.exports = { sequelize, Student, Drive, VaccinationRecord };
