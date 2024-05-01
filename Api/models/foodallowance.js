'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodAllowance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FoodAllowance.init({
    allowanceDate: DataTypes.DATE,
    allowance: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'FoodAllowance',
  });
  return FoodAllowance;
};