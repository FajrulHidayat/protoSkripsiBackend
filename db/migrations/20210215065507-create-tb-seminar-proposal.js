'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_seminar_proposals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomor: {
        type: Sequelize.STRING,
      },
      nim: {
        type: Sequelize.STRING
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
      ketua: {
        type: Sequelize.STRING
      },
      sekretaris: {
        type: Sequelize.STRING
      },
      penguji1: {
        type: Sequelize.STRING
      },
      penguji2: {
        type: Sequelize.STRING
      },
      pelaksana: {
        type: Sequelize.STRING
      },
      waktu: {
        type: Sequelize.DATE
      },
      tempat: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tb_seminar_proposals');
  }
};