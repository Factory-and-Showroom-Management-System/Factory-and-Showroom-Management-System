'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BasicSalary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //one(RoleIncome:id) to many(BasicSalary:roleId)
      BasicSalary.belongsTo(models.RoleIncome, { foreignKey: 'roleId' });
      //one(BasicSalary table:userId) to one(Earning table:userId)
      BasicSalary.hasOne(models.Earning, { foreignKey: 'userId' });
      

    }
  }
  BasicSalary.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    attenCount: DataTypes.INTEGER,
    dateIncome: DataTypes.FLOAT,
    basicSalary: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'BasicSalary',
  });
  return BasicSalary;
};