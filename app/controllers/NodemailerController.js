const { tb_akun } = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;
const authService = require("../services/authService");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer().single("pdf");
const resize = require("../services/resize.service");
const nodemailer = require('nodemailer')
const axios = require("axios")

class NodemailerController {
  async regis(req, res) {
    await upload(req, res, async function (err) {
      req.start = Date.now();
      let status;
      let message;
      let dtUser;
      let foto
      let id;
      let dMahasiswa
      let data
      console.log(req.file);
      if (err instanceof multer.MulterError) {
        // a multer error occurred when uploading
        console.log(err);
        return res.status(200).json(err);
      } else if (err) {
        console.log(err);
        return res.status(200).json(err);
      }
      axios
        .get(`http://localhost:9000/master/mahasiswa/${req.body.nim}`)
        .then(function (res) {
          console.log(res.data.result.email);
          dMahasiswa = res.data.result.email
          // next();
        })
        .catch(function (err) {
          console.log(err);
          // res.status(err.response.status).send(err.response.data);
        });


      console.log("tes1");
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'badutalbinobiru@gmail.com',
          pass: 'Crosfiremosaja1'
        }
      });
      console.log("tes2");
      var mailOptions = {
        to: `${dMahasiswa}`,
        subject: 'email menggunakan nodemailer dan nodejs',
        text: 'Wellcome to new World',
        attachments: [{
          filename: "filesktes.pdf",
          content: new Buffer(req.file.buffer, '7bit')
        }]

      };
      console.log("tes3");
      console.log(mailOptions);
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
        data = info
      });
      return res.status(200).json(data)
    });
  }


}
const email = new NodemailerController()
module.exports = email