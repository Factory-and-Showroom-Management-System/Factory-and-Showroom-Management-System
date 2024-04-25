'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleOTIncome extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RoleOTIncome.init({
    role: DataTypes.STRING,
    timeIncome: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'RoleOTIncome',
  });
  return RoleOTIncome;
};