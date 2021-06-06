const { tb_ujian_kompren } = require("../../models");
const axios = require("axios")
class KomprenController {
  async InsertData(req, res,next) {
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
      judul: req.body.judul,
      ketua: req.body.ketua,
      sekretaris: req.body.sekretaris,
      penguji1: req.body.penguji1,
      penguji2: req.body.penguji2,
      penguji3: req.body.penguji3,
    };
    console.log(item)
    const dtSAnggota = await tb_ujian_kompren.findOne({
      where: { nim: req.body.nim }
    });

    if (dtSAnggota) {
      status = 404;
      message = "Data Sudah Ada";
     
    } else {
      dtAnggota = await tb_ujian_kompren.create(item)
      .then(res=>id=res.id)
      .catch(err=>console.log(err));
      status = 200;
      message = "Berhasil Input Data"
      //permohonan
      axios
      .post("http://localhost:9000/jfu", {
        nim:item.nim,
        nama:item.nama,
        jurusan:item.jurusan,
        tentang:"Komprehensif",
        pelaksana:item.pelaksana,
        id_surat:id
      })
      .then(function(res) {
        console.log(res.status);

        next();
      })
      .catch(function(err) {
        console.log(err);
        // res.status(err.response.status).send(err.response.data);
      });
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
      dtAnggota = await tb_ujian_kompren.findAll({ order: [["id", "ASC"]] });
    } else {
      dtAnggota = await tb_ujian_kompren.findOne({
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
      judul: req.body.judul,
      ketua: req.body.ketua,
      sekretaris: req.body.sekretaris,
      penguji1: req.body.penguji1,
      penguji2: req.body.penguji2,
      penguji3: req.body.penguji3,
      };

    if (req.params.id == null) {
      status = 403;
      message = "ID harus tercantumkan";
      id = null;
    } else {
      const dtSAnggota = await tb_ujian_kompren.findOne({
        where: { id: req.params.id }
      });

      if (!dtSAnggota) {
        status = 404;
        message = "Data Member Tidak Ditemukan";
        id = null;
      } else {
        dtAnggota = await tb_ujian_kompren.update(update, {
          where: { id: req.params.id }
        });
        status = 200;
        message = "Sukses";
        id = dtSAnggota.id;
        //permohonan
      axios
      .post("http://localhost:9000/jfu", {
        nim:update.nim,
        nama:update.nama,
        jurusan:update.jurusan,
        tentang:"Komprehensif",
        pelaksana:update.pelaksana,
        id_surat:id
      })
      .then(function(res) {
        console.log(res.status);

        next();
      })
      .catch(function(err) {
        console.log(err);
        // res.status(err.response.status).send(err.response.data);
      });
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
      dtAnggota = await tb_ujian_kompren.destroy({ where: { id: req.params.id } });
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

const komprenController = new KomprenController();
module.exports = komprenController;
