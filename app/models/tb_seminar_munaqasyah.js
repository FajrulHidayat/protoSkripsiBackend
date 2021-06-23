'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_seminar_munaqasyah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_seminar_munaqasyah.init({
    nomor: DataTypes.STRING,
    nim: DataTypes.STRING,
    nama: DataTypes.STRING,
    judul: DataTypes.STRING,
    pembimbing1: DataTypes.STRING,
    pembimbing2: DataTypes.STRING,
    ketua: DataTypes.STRING,
    sekretaris: DataTypes.STRING,
    penguji1: DataTypes.STRING,
    penguji2: DataTypes.STRING,
    pelaksana: DataTypes.STRING,
    tempat: DataTypes.STRING,
    waktu: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'tb_seminar_munaqasyah',
  });
  return tb_seminar_munaqasyah;
};