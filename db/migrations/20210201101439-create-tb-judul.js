'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_juduls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,     
        type: Sequelize.INTEGER
      },
      nim: {
        type: Sequelize.STRING,
      },
      nama: {
        type: Sequelize.STRING
      },
      judul: {
        type: Sequelize.STRING
      },
      pembimbing1: {
        type: Sequelize.STRING
      },
      pembimbing2: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.STRING
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tb_juduls');
  }
};