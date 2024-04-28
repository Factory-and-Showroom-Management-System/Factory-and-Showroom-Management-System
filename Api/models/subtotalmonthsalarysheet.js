'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubTotalMonthSalarySheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SubTotalMonthSalarySheet.init({
    currentDate: DataTypes.DATE,
    totalbasicSalary: DataTypes.FLOAT,
    totalbaValue: DataTypes.FLOAT,
    fulltotalEarning: DataTypes.FLOAT,
    totalmonthLoan: DataTypes.FLOAT,
    totalepf8: DataTypes.FLOAT,
    fulltotalDeduction: DataTypes.FLOAT,
    fulltotalAllowance: DataTypes.FLOAT,
    fulltotalOT: DataTypes.FLOAT,
    fulltotalAddition: DataTypes.FLOAT,
    fullnetTotal: DataTypes.FLOAT,
    totalepf12: DataTypes.FLOAT,
    totaletf3: DataTypes.FLOAT,
    fulltotalNetPay: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'SubTotalMonthSalarySheet',
  });
  return SubTotalMonthSalarySheet;
};