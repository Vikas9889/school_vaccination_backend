const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const VaccinationRecord = sequelize.define('VaccinationRecord', {
        vaccinatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        driveId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return VaccinationRecord;
};