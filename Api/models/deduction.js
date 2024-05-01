'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deduction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Deduction.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    monthLoan: DataTypes.FLOAT,
    epf8: DataTypes.FLOAT,
    totalDeduction: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Deduction',
  });
  return Deduction;
};