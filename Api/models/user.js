'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //one to one user with address
      User.hasOne(sequelize.define('Address'));
      //one to many user with post
      User.hasMany(sequelize.define('Post'));
      //one to many user with attendance
      User.hasMany(sequelize.define('Attendance'));
      //one(RoleIncome) to many(User)
      User.belongsTo(models.RoleIncome, { foreignKey: 'roleId' });
      //one(User:userId) to many(UserTotalLoan:userId)
      User.hasMany(models.UserTotalLoan, { foreignKey: 'userId' });
      


    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER // Changed role to roleId and its data type to INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
