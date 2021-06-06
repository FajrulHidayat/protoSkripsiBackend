const { tb_surat_keluar } = require("../models");
const { Op } = require("sequelize");
class KtuController {
  async SelectData(req, res) {
    //set diagnostic
    req.start = Date.now();
    let status;
    let message;
    let dtAnggota;
    
    //get data
    if (req.params.id == null) {
      dtAnggota = await tb_surat_keluar.findAll({ 
          order: [["id", "ASC"]],
          where: { 
              [Op.not]:{
                [Op.or]: [
                  {nomor: 0} ,
                   {ksb_acc: false }
                ]
              }
            }, 
        });
    } else {
      if(req.params.id === "arsip"){
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
      }else if(req.params.id === "baru"){
        console.log(req.params.id);
        dtAnggota = await tb_surat_keluar.findAll({
          where: { 
            [Op.not]:{
              [Op.or]: [
              {nomor: 0},
              {ksb_acc: false},
              {ktu_acc: true},
              ]
            }
            },
          order: [["id", "ASC"]]
        });
      }else {
      dtAnggota = await tb_surat_keluar.findOne({
        where: { id: req.params.id,
          [Op.not]:{
            [Op.or]: [
              {nomor: 0},
              {ksb_acc: false},
              {ktu_acc: true},
              ]
          }
         },
        order: [["id", "ASC"]]
      });
    }
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

  async Acc(req, res) {
    //set diagnostic
    req.start = Date.now();
    let status;
    let message;
    let id;
    let dtAnggota;

    const update = {
        ktu_acc: req.body.acc
      };
    // const update = req.body.level==="ktu"?{ktu_acc:req.body.acc}:req.body.level==="ksb"?{ksb_acc:req.body.acc}:null

    if (req.params.id == null) {
      status = 403;
      message = "ID harus tercantumkan";
      id = null;
    // } else if(!update === null){
    //     status = 400;
    //     message = "Bad Request";
    //     id = null;
    }else {
      const dtSAnggota = await tb_surat_keluar.findOne({
        where: { id: req.params.id,
          [Op.not]:{
            [Op.or]: [
              {nomor: 0} ,
               {ksb_acc: false }
            ]
          }
        }
      });

      if (!dtSAnggota) {
        status = 404;
        message = "Data Member Tidak Ditemukan";
        id = null;
      } else {
        dtAnggota = await tb_surat_keluar.update(update, {
          where: { id: req.params.id,
            
            },
             
        });
        status = 200;
        message = "Sukses";
        id = dtSAnggota.id;
      }
    }

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
      result: id
    };
    return res.status(status).json(data);
  }
  
}

const ktuController = new KtuController();
module.exports = ktuController;
