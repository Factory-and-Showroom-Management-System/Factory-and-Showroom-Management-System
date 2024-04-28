'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MonthEpfEtfs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      basicSalary: {
        type: Sequelize.FLOAT
      },
      epf8: {
        type: Sequelize.FLOAT
      },
      epf12: {
        type: Sequelize.FLOAT
      },
      totalEpf8Epf12: {
        type: Sequelize.FLOAT
      },
      etf3: {
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
    await queryInterface.dropTable('MonthEpfEtfs');
  }
};