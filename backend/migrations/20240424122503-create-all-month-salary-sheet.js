'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AllMonthSalarySheets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      monthCurrentDate: {
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
      allBasicSalary: {
        type: Sequelize.FLOAT
      },
      allBaValue: {
        type: Sequelize.FLOAT
      },
      allTotalEarning: {
        type: Sequelize.FLOAT
      },
      allMonthLoan: {
        type: Sequelize.FLOAT
      },
      allEpf8: {
        type: Sequelize.FLOAT
      },
      allTotalDeduction: {
        type: Sequelize.FLOAT
      },
      allTotalAllowance: {
        type: Sequelize.FLOAT
      },
      allTotalOT: {
        type: Sequelize.FLOAT
      },
      allTotalAddition: {
        type: Sequelize.FLOAT
      },
      allNetTotal: {
        type: Sequelize.FLOAT
      },
      allEpf12: {
        type: Sequelize.FLOAT
      },
      allEtf3: {
        type: Sequelize.FLOAT
      },
      allTotaNetPay: {
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
    await queryInterface.dropTable('AllMonthSalarySheets');
  }
};