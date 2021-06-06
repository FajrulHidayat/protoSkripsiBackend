'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_surat_keluars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomor: {
        type: Sequelize.STRING,
        defaultValue:0
      },
      nim: {
        type: Sequelize.STRING
      },
      nama: {
        type: Sequelize.STRING
      },
      jurusan: {
        type: Sequelize.STRING
      },
      tentang: {
        type: Sequelize.STRING
      },
      pelaksana: {
        type: Sequelize.STRING,
        defaultValue:"-"
      },
      ksb_acc: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      ktu_acc: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      wd_acc: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      dk_acc: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      waktu: {
        type: Sequelize.DATE
      },
      id_surat: {
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
    await queryInterface.dropTable('tb_surat_keluars');
  }
};