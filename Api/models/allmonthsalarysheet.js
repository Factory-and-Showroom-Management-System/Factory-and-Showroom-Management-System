'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AllMonthSalarySheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AllMonthSalarySheet.init({
    monthCurrentDate: DataTypes.DATE,
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    allBasicSalary: DataTypes.FLOAT,
    allBaValue: DataTypes.FLOAT,
    allTotalEarning: DataTypes.FLOAT,
    allMonthLoan: DataTypes.FLOAT,
    allEpf8: DataTypes.FLOAT,
    allTotalDeduction: DataTypes.FLOAT,
    allTotalAllowance: DataTypes.FLOAT,
    allTotalOT: DataTypes.FLOAT,
    allTotalAddition: DataTypes.FLOAT,
    allNetTotal: DataTypes.FLOAT,
    allEpf12: DataTypes.FLOAT,
    allEtf3: DataTypes.FLOAT,
    allTotaNetPay: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'AllMonthSalarySheet',
  });
  return AllMonthSalarySheet;
};