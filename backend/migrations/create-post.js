'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      shortDescription: {
        type: Sequelize.STRING
      },
      detail: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'Hoạt động'
      },
      target: {
        type: Sequelize.STRING,
        defaultValue: 'Tất cả'
      },
      priceNumber: {
        type: Sequelize.FLOAT
      },
      areaNumber: {
        type: Sequelize.FLOAT
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      priceId: {
        type: Sequelize.INTEGER
      },
      areaId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Posts');
  }
};