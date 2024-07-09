'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BioData extends Model {
    static associate(models) {
      BioData.hasMany(models.attendance, {
        foreignKey: 'userId',
        as: 'attendance',
      });
      BioData.belongsTo(models.Role,
        {
          foreignKey: 'roleId',
          as: 'role',
        }
      );
    }
  }
  BioData.init({
    userId: DataTypes.INTEGER,
    nameWini: DataTypes.STRING,
    nameWFull: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    age: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    bankNumber: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    imgSrc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BioData',

    tableName: 'BioData',

  });
  return BioData;
};