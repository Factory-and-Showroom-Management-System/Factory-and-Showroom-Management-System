'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MonthEpfEtf extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MonthEpfEtf.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    basicSalary: DataTypes.FLOAT,
    epf8: DataTypes.FLOAT,
    epf12: DataTypes.FLOAT,
    totalEpf8Epf12: DataTypes.FLOAT,
    etf3: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'MonthEpfEtf',
  });
  return MonthEpfEtf;
};