'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_surat_keluar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //   models.tb_mahasiswa.hasMany(tb_surat_keluar, {foreignKey: 'nim'})
    //   tb_surat_keluar.belongsTo(models.tb_mahasiswa, {
    //     foreignKey:'nim'
        
    //   });
    }
  };
  tb_surat_keluar.init({
    nomor: DataTypes.STRING,
    nim: DataTypes.STRING,
    nama: DataTypes.STRING,
    jurusan: DataTypes.STRING,
    tentang: DataTypes.STRING,
    pelaksana: DataTypes.STRING,
    ksb_acc: DataTypes.BOOLEAN,
    ktu_acc: DataTypes.BOOLEAN,
    wd_acc: DataTypes.BOOLEAN,
    dk_acc: DataTypes.BOOLEAN,
    waktu: DataTypes.DATE,
    id_surat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_surat_keluar',
  });
  return tb_surat_keluar;
};