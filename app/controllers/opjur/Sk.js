const { tb_surat_keluar} = require("../../models");
const { Op } = require("sequelize");
class Sk {
  
  async SelectData(req, res) {
    //set diagnostic
    req.start = Date.now();
    let status;
    let message;
    let dtAnggota;
    
    //get data
    if (req.params.id == null) {
        dtAnggota = await tb_surat_keluar.findAll({
            where: {
              [Op.not]:{
                [Op.or]: [
                {nomor: 0},
                {ksb_acc: false },
                {ktu_acc: false },
                {wd_acc: false },
                {dk_acc: false }
                ]
              } },
            order: [["id", "ASC"]]
    });
    } else {
        dtAnggota = await tb_surat_keluar.findOne({
            where: {
                [Op.not]:{
                  [Op.or]: [
                  {nomor: 0},
                  {ksb_acc: false },
                  {ktu_acc: false },
                  {wd_acc: false },
                  {dk_acc: false }
                  ]
                } },
              order: [["id", "ASC"]]
        });
      
    }
    if (!dtAnggota) {
      status = 404;
      message = "Data Member Tidak Ditemukan";
    } else {
      status = 200;
      message = "Sukses";
    }
    // .then(angg=>{
    //     res.json(angg)
    // })
    // return res.status(200).send({
    //     message : 'Data Anggota Belum ada'
    // })

    //get diagnostic
    let time = Date.now() - req.start;
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    const data = {
      diagnostic: {
        status: status,
        message: message,
        memoryUsage: `${Math.round(used * 100) / 100} MB`,
        elapsedTime: time,
        timestamp: Date(Date.now()).toString()
      },
      result: dtAnggota
    };
    return res.status(status).json(data);
  }
}

const sk = new Sk();
module.exports = sk;
