'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BudgetedAllowance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // one(BudgetedAllowance table:id) to many(Earning table: baValue )


    }
  }
  BudgetedAllowance.init({
    baDate: DataTypes.DATE,
    baValue: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'BudgetedAllowance',
  });
  return BudgetedAllowance;
};