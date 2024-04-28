'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const currentDate = new Date();

    return queryInterface.bulkInsert('categories', [
      {
        name: 'Electronics',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        name: 'Fashion',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        name: 'Home Appliances',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      // Add other categories with createdAt and updatedAt fields
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', {}, null);
  }
};
