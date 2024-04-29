'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BioData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association 
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
    bankNumber: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING,
    imgSrc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BioData',
  });
  return BioData;
};