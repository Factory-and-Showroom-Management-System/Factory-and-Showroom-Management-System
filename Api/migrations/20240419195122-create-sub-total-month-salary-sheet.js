'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SubTotalMonthSalarySheets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      currentDate: {
        type: Sequelize.DATE
      },
      totalbasicSalary: {
        type: Sequelize.FLOAT
      },
      totalbaValue: {
        type: Sequelize.FLOAT
      },
      fulltotalEarning: {
        type: Sequelize.FLOAT
      },
      totalmonthLoan: {
        type: Sequelize.FLOAT
      },
      totalepf8: {
        type: Sequelize.FLOAT
      },
      fulltotalDeduction: {
        type: Sequelize.FLOAT
      },
      fulltotalAllowance: {
        type: Sequelize.FLOAT
      },
      fulltotalOT: {
        type: Sequelize.FLOAT
      },
      fulltotalAddition: {
        type: Sequelize.FLOAT
      },
      fullnetTotal: {
        type: Sequelize.FLOAT
      },
      totalepf12: {
        type: Sequelize.FLOAT
      },
      totaletf3: {
        type: Sequelize.FLOAT
      },
      fulltotalNetPay: {
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
    await queryInterface.dropTable('SubTotalMonthSalarySheets');
  }
};