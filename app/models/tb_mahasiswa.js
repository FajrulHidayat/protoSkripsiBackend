'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   tb_mahasiswa.hasMany(models.tb_surat_keluar, {foreignKey: 'nim'})
      //   models.tb_surat_keluar.belongsTo(tb_mahasiswa, {
      //     foreignKey:'nim'
      //   });
    }
  };
  tb_mahasiswa.init({
    nim: { type: DataTypes.STRING, primaryKey: true },
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    jurusan: DataTypes.STRING,
    fakultas: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_mahasiswa',
  });
  return tb_mahasiswa;
};