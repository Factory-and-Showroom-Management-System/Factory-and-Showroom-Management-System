'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Earning extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // one(BudgetedAllowance table:id) to many(Earning table: baValue )

      //one(BasicSalary table:userId) to one(Earning table:userId)
      Earning.belongsTo(models.BasicSalary, { foreignKey: 'userId' });

    }
  }
  Earning.init({
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    basicSalary: DataTypes.FLOAT,
    baValue: DataTypes.FLOAT,
    totalEarning: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Earning',
  });
  return Earning;
};