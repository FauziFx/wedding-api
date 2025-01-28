"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("generals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      time: {
        type: Sequelize.TIME,
      },
      date: {
        type: Sequelize.DATE,
      },
      address: {
        type: Sequelize.STRING,
      },
      maps: {
        type: Sequelize.STRING,
      },
      music: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      bg_image: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("generals");
  },
};
