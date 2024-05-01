'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTotalLoan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //one(User:userId) to many(UserTotalLoan:userId)
      UserTotalLoan.belongsTo(models.User, { foreignKey: 'userId' });
      //one(UserMonthLoan:userId) to many(UserTotalLoan:userId)
      UserTotalLoan.hasMany(models.UserMonrhLoan, { foreignKey: 'userId' });
    

    }
  }
  UserTotalLoan.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    loanDate: DataTypes.DATE,
    loanAmount: DataTypes.FLOAT,
    toBePaid: DataTypes.FLOAT,
    loanRatePresentage: DataTypes.FLOAT,
    loanDuration: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserTotalLoan',
  });
  return UserTotalLoan;
};