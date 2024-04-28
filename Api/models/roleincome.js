'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleIncome extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //one(RoleIncome) to many(User)
      RoleIncome.hasMany(models.User, { foreignKey: 'roleId' });
      //one(RoleIncome:id) to many(BasicSalary:roleId)
      RoleIncome.hasMany(models.BasicSalary, { foreignKey: 'roleId' });
      
    }
  }
  RoleIncome.init({
    role: DataTypes.STRING,
    dateIncome: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'RoleIncome',
  });
  return RoleIncome;
};