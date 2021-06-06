const {tb_akun} = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;
const authService = require("../services/authService");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer().single("foto");
const resize = require("../services/resize.service");

class Authentication {
  async regis(req, res) {
    await upload(req, res, async function(err) {
    req.start = Date.now();
      let status;
      let message;
      let dtUser;
      let foto
      let id;
      if (err instanceof multer.MulterError) {
        // a multer error occurred when uploading
        return res.status(200).json(err);
      } else if (err) {
        return res.status(200).json(err);
      }
      const imagePath = path.join(
        __dirname,
        "../../public/image/pegawai"
      );
      const fileUpload = new resize(imagePath);
          foto = await fileUpload.save(req.file.buffer, req.file.originalname);
      const item = {
        nip: req.body.nip,
        nama: req.body.nama,
        foto: foto,
        jabatan: req.body.jabatan,
        pass: req.body.pass
      };
      console.log(item);
      const dtSUser = await tb_akun.findOne({
        where: { nip:item.nip }
      });
      if(!dtSUser){
        dtUser = await tb_akun.create(item);
        status = 200;
        message = "Akun Berhasil Dibuat"
      }else if(dtSUser.nip === item.nip){
        status = 401  
        message = "Akun Sudah Ada"
      }
      
      //get diagnostic
      let time = Date.now() - req.start;
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      const data = {
        diagnostic: {
          memoryUsage: `${Math.round(used * 100) / 100} MB`,
          elapsedTime: time,
          timestamp: Date(Date.now()).toString(),
          status:status,
          message:message
        }
      };
        return res.status(status).json(data)
    });
  }
  async login(req, res) {
    req.start = Date.now();
    let status;
    let message;
    let token;
    let nip = req.header("nip");
    let password = req.header("password");
    // let noWA = req.header("noWA");
    let response = {};
    console.log(nip)
    const dtMember = await tb_akun.findOne({ where: { nip:nip } });
    if (!dtMember) {
      status = 404;
      message = "Data member tidak ditemukan";
    } else {
      // const match = await bcrypt.compare(password, dtMember.password);
      // if (match === false) {
      if (password != dtMember.pass) {
        status = 401;
        message = "Unauthorized";
        token = null;
      } else {
        token = authService().issue({ id: nip, type: dtMember.jabatan });
        token = `Bearer ${token}`;
        status = 200;
        message = "Login berhasil";
        response = {
          nip: dtMember.nip,
          nama: dtMember.nama,
          jabatan: dtMember.jabatan
        };
      }
    }
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
      result: response
    };
    res.set({ Authorization: token });
    res.set({ "Access-Control-Allow-Headers": "*" });
    res.set({ "Access-Control-Expose-Headers": "Authorization" });
    return res.status(status).json(data);
  }
  // my validation
  // async validation(req, res) {
  //   const { token } = req.headers;

  //   authService().verify(token, err,status => {
  //     if (err) {
  //       return res.status(401).json({ isvalid: false, err: "Invalid Token!" });
  //     }

  //     return res.status(200).json({ isvalid: true });
  //   });
  // }

  // second validation
  async verify(req, res) {
    req.start = Date.now();
    let data;
    let status;
    let message;
    let response;
   
    const token = req.header("Authorization").split("Bearer ")[1];
  

    let time = Date.now() - req.start;
    authService().verify(token, (err, result) => {
      if (err) {
        status = 401;
        message = err.message;
        response = {
          isvalid: false
        };
      } else {
        status = 200;
        message = "validasi sukses";
        response = {
          isvalid: true,
          nip:result.id,
          type: result.type
        };
      }
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      data = {
        diagnostic: {
          status: status,
          message: message,
          memoryUsage: `${Math.round(used * 100) / 100} MB`,
          elapsedTime: time,
          timestamp: Date(Date.now()).toString()
        },
        result: response
      };
      return res.status(status).json(data);
    });
  }

  async logout(req, res) {
    const token = req.header("Authorization").split("Bearer ")[1];

    authService().blacklist(token, err => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: "Invalid Token!" });
      }

      return res.status(200).json({ isvalid: true });
    });
    return res.status(401).json({ isvalid: "token revoked" });
  }

}
const auth = new Authentication()
module.exports =  auth