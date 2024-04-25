'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MonthOT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MonthOT.init({
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    extraTimeCount: DataTypes.INTEGER,
    tIncome: DataTypes.FLOAT,
    totalOT: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'MonthOT',
  });
  return MonthOT;
};