const { tb_mahasiswa } = require("../models");
class MahasiswaController {
  async InsertData(req, res) {
    //set diagnostic
    req.start = Date.now();
    let status;
    let message;
    let dtAnggota;
    let id;

    // if(req.body.password == req.body.confirmPassword)
    const item = {
      nim: req.body.nim,
      nama: req.body.nama,
      jurusan: req.body.jurusan,
      fakultas: req.body.fakultas
    };
    console.log(item)
    const dtSAnggota = await tb_mahasiswa.findOne({
      where: { nim: req.body.nim }
    });

    if (dtSAnggota) {
      status = 404;
      message = "Data Sudah Ada";
     
    } else {
      dtAnggota = await tb_mahasiswa.create(item);
      status = 200;
      message = "Berhasil Input Data"
    }
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
      dtAnggota = await tb_mahasiswa.findAll({ order: [["id", "ASC"]] });
    } else {
      dtAnggota = await tb_mahasiswa.findOne({
        where: { nim: req.params.id },
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

  // async getOnedata(req, res){
  //     //set diagnostic
  //     req.start = Date.now();
  //     let status;
  //     let message;

  //     //get data
  //     const dtAnggota = await anggota.findAll({
  //         where: ['id'],
  //         order: [['id','ASC']]
  //     })
  //     if (!dtAnggota){
  //         status = '404;'
  //         message = 'Data Member Tidak Ditemukan'
  //     }else{
  //         status = '200'
  //         message = 'Sukses'
  //     }
  //     // .then(angg=>{
  //     //     res.json(angg)
  //     // })
  //     // return res.status(200).send({
  //     //     message : 'Data Anggota Belum ada'
  //     // })

  //     //get diagnostic
  //     let time = Date.now() - req.start;
  //     const used = process.memoryUsage().heapUsed / 1024 / 1024;
  //     const data = {
  //         diagnostic:{
  //             status : status,
  //             message : message,
  //             memoryUsage : `${Math.round(used * 100) / 100} MB`,
  //             elapsedTime : time,
  //             timestamp : Date(Date.now()).toString(),
  //         },
  //         result: dtAnggota
  //     }
  //     return res.status(status).json(data)
  // }

  async UpdateData(req, res) {
    //set diagnostic
    req.start = Date.now();
    let status;
    let message;
    let id;
    let dtAnggota;

    const update = {
        nim: req.body.nim,
        nama: req.body.nama,
        jurusan: req.body.jurusan,
        fakultas: req.body.fakultas
      };

    if (req.params.id == null) {
      status = 403;
      message = "ID harus tercantumkan";
      id = null;
    } else {
      const dtSAnggota = await tb_mahasiswa.findOne({
        where: { id: req.params.id }
      });

      if (!dtSAnggota) {
        status = 404;
        message = "Data Member Tidak Ditemukan";
        id = null;
      } else {
        dtAnggota = await tb_mahasiswa.update(update, {
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
  async DeleteData(req, res) {
    //set diagnostic
    req.start = Date.now();
    let status;
    let message;
    let dtAnggota;
    let id;

    if (req.params.id == null) {
      status = 403;
      message = "ID harus tercantumkan";
      id = null;
    } else {
      dtAnggota = await tb_mahasiswa.destroy({ where: { id: req.params.id } });
    }
    if (!dtAnggota) {
      status = 404;
      message = "Data Member Tidak Ditemukan";
      id = null;
    } else {
      status = 200;
      message = "Sukses";
      id = dtAnggota.id;
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

const mahasiswaController = new MahasiswaController();
module.exports = mahasiswaController;
