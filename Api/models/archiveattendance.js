'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArchiveAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ArchiveAttendance.belongsTo(models.BioData, {
        foreignKey: 'userId',
        as: 'BioData',
    });
}
  }
  ArchiveAttendance.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    dateIn: DataTypes.DATE,
    timeIn: DataTypes.TIME,
    timeOut: DataTypes.TIME,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ArchiveAttendance',
  });
  return ArchiveAttendance;
};