'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FinishProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FinishProduct.init({
    pid: DataTypes.STRING,
    product_name: DataTypes.STRING,
    username: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'FinishProduct',
  });
  return FinishProduct;
};