'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_ujian_kompren extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_ujian_kompren.init({
    nim: DataTypes.STRING,
    nama: DataTypes.STRING,
    judul: DataTypes.STRING,
    ketua: DataTypes.STRING,
    sekretaris: DataTypes.STRING,
    penguji1: DataTypes.STRING,
    penguji2: DataTypes.STRING,
    penguji3: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_ujian_kompren',
  });
  return tb_ujian_kompren;
};