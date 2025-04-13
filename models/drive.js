// models/drive.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Drive = sequelize.define('Drive', {
    vaccineName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dosesAvailable: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    applicableClasses: {
      type: DataTypes.STRING, // e.g., "5,6,7"
      allowNull: false,
    },
  }, {
    tableName: 'drives', // Ensure the table name is in lowercase
  });

  return Drive;
};
