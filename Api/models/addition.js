'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Addition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Addition.init({
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    totalOT: DataTypes.FLOAT,
    totalAllowance: DataTypes.FLOAT,
    totalAddition: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Addition',
  });
  return Addition;
};