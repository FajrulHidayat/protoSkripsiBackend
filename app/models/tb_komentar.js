'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_komentar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_komentar.init({
    komen: DataTypes.STRING,
    level: DataTypes.STRING,
    id_surat: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tb_komentar',
  });
  return tb_komentar;
};