'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MonthSalarySheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MonthSalarySheet.init({
    currentDate: DataTypes.DATE,
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    basicSalary: DataTypes.FLOAT,
    baValue: DataTypes.FLOAT,
    totalEarning: DataTypes.FLOAT,
    monthLoan: DataTypes.FLOAT,
    epf8: DataTypes.FLOAT,
    totalDeduction: DataTypes.FLOAT,
    totalAllowance: DataTypes.FLOAT,
    totalOT: DataTypes.FLOAT,
    totalAddition: DataTypes.FLOAT,
    netTotal: DataTypes.FLOAT,
    epf12: DataTypes.FLOAT,
    etf3: DataTypes.FLOAT,
    totaNetPay: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'MonthSalarySheet',
  });
  return MonthSalarySheet;
};