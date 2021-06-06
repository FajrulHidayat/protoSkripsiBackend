const {tb_akun} = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;
const authService = require("../services/authService");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer().single("pdf");
const resize = require("../services/resize.service");
const nodemailer = require('nodemailer')

class NodemailerController {
  async regis(req, res) {
    await upload(req, res, async function(err) {
    req.start = Date.now();
      let status;
      let message;
      let dtUser;
      let foto
      let id;
      let data
      if (err instanceof multer.MulterError) {
        // a multer error occurred when uploading
        return res.status(200).json(err);
      } else if (err) {
        return res.status(200).json(err);
      }
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'badutalbinobiru@gmail.com',
            pass: 'Crosfiremosaja1'
        }
    });
    var mailOptions = {
        from: 'fajrulknight2@gmail.com',
        to: 'ikanlari2@gmail.com',
        subject: 'email menggunakan nodemailer dan nodejs',
        text: 'Wellcome to new World',
        attachments:[{
            filename:"filesktes.pdf",
            content: new Buffer(req.file.buffer,'7bit')
        }]
        
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
        data=info
    });
        return res.status(200).json(data)
    });
  }
  

}
const email = new NodemailerController()
module.exports =  email