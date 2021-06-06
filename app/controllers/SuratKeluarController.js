const { tb_surat_keluar } = require("../models");
class SuratMasukController {
  async  Pengajuan(req, res) {
    //set diagnostic
    req.start = Date.now();
    let status;
    let message;
    let dtAnggota;
    let id;

    // if(req.body.password == req.body.confirmPassword)
    const item = {
      nim: req.body.nim,
      tentang:req.body.tentang,
    };
    console.log(item)
   
      dtAnggota = await tb_surat_keluar.create(item);
      status = 200;
      message = "Berhasil Input Data"
    
    //get diagnostic
    let time = Date.now() - req.start;
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    const data = {
      diagnostic: {
        memoryUsage: `${Math.round(used * 100) / 100} MB`,
        elapsedTime: time,
        timestamp: Date(Date.now()).toString()
      },
      result:{
        status:status,
        messagae:message
      }
    };
    return res.status(status).json(data);
  }
  async SelectData(req, res) {
    //set diagnostic
    req.start = Date.now();
    let status;
    let message;
    let dtAnggota;
    
    //get data
    if (req.params.id == null) {
      dtAnggota = await tb_surat_keluar.findAll({ order: [["id", "ASC"]] });
    } else {
      dtAnggota = await tb_surat_keluar.findOne({
        where: { id: req.params.id },
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

  async disposisi(req, res) {
    //set diagnostic
    req.start = Date.now();
    let status;
    let message;
    let id;
    let dtAnggota;

    // const update 
    // {
    //     nim: req.body.nim,
    //     nama: req.body.nama,
    //     judul: req.body.judul,
    //     pembimbing1: req.body.pembimbing1,
    //     pembimbing2: req.body.pembimbing2,
    //     penguji1: req.body.penguji1,
    //     penguji2: req.body.penguji2,
    //     waktu: req.body.waktu,
    //   };
    const update = req.body.level==="ktu"?{ktu_acc:req.body.acc}:req.body.level==="ksb"?{ksb_acc:req.body.acc}:req.body.level==="wd"?{wd_acc:req.body.acc}:req.body.level==="dk"?{dk_acc:req.body.acc}:null

    if (req.params.id == null) {
      status = 403;
      message = "ID harus tercantumkan";
      id = null;
    } else if(!update === null){
        status = 400;
        message = "Bad Request";
        id = null;
    }else {
      const dtSAnggota = await tb_surat_keluar.findOne({
        where: { id: req.params.id }
      });

      if (!dtSAnggota) {
        status = 404;
        message = "Data Member Tidak Ditemukan";
        id = null;
      } else {
        dtAnggota = await tb_surat_keluar.update(update, {
          where: { id: req.params.id }
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
  async Penomoran(req, res) {
    //set diagnostic
    req.start = Date.now();
    let status;
    let message;
    let id;
    let dtAnggota;

    const update = {
        nomor: req.body.nomor
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
        where: { id: req.params.id }
      });

      if (!dtSAnggota) {
        status = 404;
        message = "Data Member Tidak Ditemukan";
        id = null;
      } else {
        dtAnggota = await tb_surat_keluar.update(update, {
          where: { id: req.params.id }
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

const suratMasukController = new SuratMasukController();
module.exports = suratMasukController;
