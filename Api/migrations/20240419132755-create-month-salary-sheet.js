'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MonthSalarySheets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      currentDate: {
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      basicSalary: {
        type: Sequelize.FLOAT
      },
      baValue: {
        type: Sequelize.FLOAT
      },
      totalEarning: {
        type: Sequelize.FLOAT
      },
      monthLoan: {
        type: Sequelize.FLOAT
      },
      epf8: {
        type: Sequelize.FLOAT
      },
      totalDeduction: {
        type: Sequelize.FLOAT
      },
      totalAllowance: {
        type: Sequelize.FLOAT
      },
      totalOT: {
        type: Sequelize.FLOAT
      },
      totalAddition: {
        type: Sequelize.FLOAT
      },
      netTotal: {
        type: Sequelize.FLOAT
      },
      epf12: {
        type: Sequelize.FLOAT
      },
      etf3: {
        type: Sequelize.FLOAT
      },
      totaNetPay: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MonthSalarySheets');
  }
};