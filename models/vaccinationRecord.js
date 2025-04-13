const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const VaccinationRecord = sequelize.define('VaccinationRecord', {
    vaccinatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return VaccinationRecord;
};
