'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_judul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_judul.init({
    nomor: DataTypes.STRING,
    nim: DataTypes.STRING,
    nama: DataTypes.STRING,
    judul: DataTypes.STRING,
    pembimbing1: DataTypes.STRING,
    pembimbing2: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_judul',
  });
  return tb_judul;
};