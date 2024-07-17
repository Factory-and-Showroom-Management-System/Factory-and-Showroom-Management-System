'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MonthAttempCount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MonthAttempCount.init({
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    currentDate: DataTypes.DATE,
    attempCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MonthAttempCount',
  });
  return MonthAttempCount;
};