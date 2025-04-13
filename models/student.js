const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Student = sequelize.define('Student', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    className: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    vaccinated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Student;
};
