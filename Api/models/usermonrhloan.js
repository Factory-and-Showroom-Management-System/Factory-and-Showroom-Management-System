'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserMonrhLoan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     //one(UserMonthLoan:userId) to many(UserTotalLoan:userId)
      UserMonrhLoan.belongsTo(models.UserTotalLoan, { foreignKey: 'userId' });
      
    }
  }
  UserMonrhLoan.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    currentDate: DataTypes.DATE,
    monthLoan: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'UserMonrhLoan',
  });
  return UserMonrhLoan;
};