'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {
      Attendance.belongsTo(models.BioData, {
        foreignKey: 'userId',
        as: 'BioData',
      });
    }
  }
  
  Attendance.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    dateIn: DataTypes.DATE,
    timeIn: DataTypes.TIME,
    timeOut: DataTypes.TIME,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Attendance',
    tableName: 'attendances',
  });
  
  return Attendance;
};
