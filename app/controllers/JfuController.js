const { tb_surat_keluar, tb_judul, tb_seminar_proposal, tb_seminar_hasil, tb_ujian_kompren, tb_seminar_munaqasyah } = require("../models");
const { Op } = require("sequelize");
const dateFormat = require("../services/FormatDate")
const axios = require("axios")
class JfuController {
  async Pengajuan(req, res) {
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
      tentang: req.body.tentang,
      id_surat: req.body.id_surat,
      pelaksana: req.body.pelaksana,
      waktu: dateFormat(Date(Date.now()))
    };
    // console.log(item)

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
      result: {
        status: status,
        messagae: message
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
      dtAnggota = await tb_surat_keluar.findAll({
        order: [["id", "ASC"]]
      });
    } else {
      if (req.params.id === "arsip") {
        dtAnggota = await tb_surat_keluar.findAll({
          where: {
            [Op.not]: {
              [Op.or]: [
                { nomor: 0 },
                { ksb_acc: false },
                { ktu_acc: false },
                { wd_acc: false },
                { dk_acc: false }
              ]
            }
          },
          order: [["id", "ASC"]]
        });
      } else if (req.params.id === "proses") {
        dtAnggota = await tb_surat_keluar.findAll({
          where: {
            [Op.and]: [
              {
                [Op.not]: [
                  { nomor: 0 }]
              }
              , {
                [Op.not]: [
                  {
                    [Op.and]: [
                      { ksb_acc: true },
                      { ktu_acc: true },
                      { wd_acc: true },
                      { dk_acc: true }
                    ]
                  }
                ]
              }
            ]
          },
          order: [["id", "ASC"]]
        });
      } else if (req.params.id === "baru") {
        dtAnggota = await tb_surat_keluar.findAll({
          where: {

            nomor: 0
          },
          order: [["id", "ASC"]]
        });
      } else {
        dtAnggota = await tb_surat_keluar.findOne({
          where: { id: req.params.id },
          order: [["id", "ASC"]]
        });
      }
    }
    console.log(req.params.id);
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

  async Penomoran(req, res) {
    //set diagnostic
    req.start = Date.now();
    let status;
    let message;
    let id;
    let dtAnggota;
    let upData;

    const update = {
      nomor: req.body.nomor,
      pelaksana: req.body.pelaksana
    };
    // const update = req.body.level==="ktu"?{ktu_acc:req.body.acc}:req.body.level==="ksb"?{ksb_acc:req.body.acc}:null
    // console.log(req.params.tentang);
    if (req.params.id == null) {
      status = 403;
      message = "ID harus tercantumkan";
      id = null;
      // } else if(!update === null){
      //     status = 400;
      //     message = "Bad Request";
      //     id = null;
    } else {
      const dtSAnggota = await tb_surat_keluar.findOne({
        where: { id: req.params.id }
      });

      if (!dtSAnggota) {
        status = 404;
        message = "Data Surat Tidak Ditemukan";
        id = null;
      } else {
        dtAnggota = await tb_surat_keluar.update(update, {
          where: { id: req.params.id }
        });
        status = 200;
        message = "Sukses";
        id = dtSAnggota.id;
        console.log(dtSAnggota.id_surat);
        switch (req.params.tentang) {
          case "Proposal":
            upData = await tb_seminar_proposal.update({ pelaksana: update.pelaksana }, {
              where: { id: dtSAnggota.id_surat }
            });
            break;
          case "Hasil":
            upData = await tb_seminar_hasil.update({ pelaksana: update.pelaksana }, {
              where: { id: dtSAnggota.id_surat }
            });
            break;
          case "Munaqasyah":
            upData = await tb_seminar_munaqasyah.update({ pelaksana: update.pelaksana }, {
              where: { id: dtSAnggota.id_surat }
            });
            break;

          default:
            break;
        }
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
  //get Pembimbing
  async SelectPembimbing(req, res) {
    //set diagnostic
    req.start = Date.now();
    let status;
    let message;
    let dtAnggota;

    //get data
    if (req.params.id == null) {
      dtAnggota = await tb_judul.findAll({ order: [["id", "ASC"]] });
    } else {
      dtAnggota = await tb_judul.findOne({
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
  //get Proposal
  async SelectProposal(req, res) {
    //set diagnostic
    req.start = Date.now();
    let status;
    let message;
    let dtAnggota;

    //get data
    if (req.params.id == null) {
      dtAnggota = await tb_seminar_proposal.findAll({ order: [["id", "ASC"]] });
    } else {
      dtAnggota = await tb_seminar_proposal.findOne({
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
  //get hasil
  async SelectHasil(req, res) {
    //set diagnostic
    req.start = Date.now();
    let status;
    let message;
    let dtAnggota;

    //get data
    if (req.params.id == null) {
      dtAnggota = await tb_seminar_hasil.findAll({ order: [["id", "ASC"]] });
    } else {
      dtAnggota = await tb_seminar_hasil.findOne({
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
  //get kompren
  async SelectKomprehensif(req, res) {
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
  //get munaqasyah
  async SelectMunaqasyah(req, res) {
    //set diagnostic
    req.start = Date.now();
    let status;
    let message;
    let dtAnggota;

    //get data
    if (req.params.id == null) {
      dtAnggota = await tb_seminar_munaqasyah.findAll({ order: [["id", "ASC"]] });
    } else {
      dtAnggota = await tb_seminar_munaqasyah.findOne({
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

const jfuController = new JfuController();
module.exports = jfuController;
