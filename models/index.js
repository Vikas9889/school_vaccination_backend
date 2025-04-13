const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db');

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'postgres',
  logging: false,
});

const Student = require('./student')(sequelize);
const Drive = require('./drive')(sequelize);
const VaccinationRecord = require('./vaccinationRecord')(sequelize);

// Associations
Student.belongsToMany(Drive, {
  through: VaccinationRecord,
  foreignKey: 'studentId',
});
Drive.belongsToMany(Student, {
  through: VaccinationRecord,
  foreignKey: 'driveId',
});

VaccinationRecord.belongsTo(Student, { foreignKey: 'studentId' });
VaccinationRecord.belongsTo(Drive, { foreignKey: 'driveId' });

sequelize.sync(); // optional in production, but good for dev

module.exports = {
  sequelize,
  Student,
  Drive,
  VaccinationRecord,
};
