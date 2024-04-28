'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MonthFoodAllowance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MonthFoodAllowance.init({
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    attenCount: DataTypes.INTEGER,
    allowance: DataTypes.FLOAT,
    totalAllowance: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'MonthFoodAllowance',
  });
  return MonthFoodAllowance;
};