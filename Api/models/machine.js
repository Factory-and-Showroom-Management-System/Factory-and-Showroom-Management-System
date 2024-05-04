'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Machine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Machine.init({
    machineId: DataTypes.STRING,
    input: DataTypes.FLOAT,
    output: DataTypes.FLOAT,
    dateIn: DataTypes.DATE,
    timeIn: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Machine',
  });
  return Machine;
};