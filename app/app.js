const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const authRoutes = require("../routes/auth");
const masterRoutes = require("../routes/master");
const jfuRoutes = require("../routes/jfuRoute");
const ksbRoutes = require("../routes/ksbRoute");
const ktuRoutes = require("../routes/ktuRoute");
const wdRoutes = require("../routes/wdRoute");
const dkRoutes = require("../routes/dkRoute");
const emailRoutes = require("../routes/email");
const pdfRoutes = require("../routes/pdf");
const akunRoutes = require("../routes/akun");
const komenRoutes = require("../routes/komen");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// axios.defaults.baseURL = "http://localhost:9000/";
axios.defaults.baseURL = "http://151.106.108.85:9000/";
app.get("/", (req, res) =>
  res.status(200).send({
    message: "selamat datang",
  })
);

app.use("/image", express.static("public/image/pegawai"));
app.use("/auth", authRoutes);
app.use("/master", masterRoutes);
app.use("/jfu", jfuRoutes);
app.use("/ksb", ksbRoutes);
app.use("/ktu", ktuRoutes);
app.use("/wd", wdRoutes);
app.use("/dk", dkRoutes);
app.use("/email", emailRoutes);
app.use("/pdf", pdfRoutes);
app.use("/akun", akunRoutes);
app.use("/komen", komenRoutes);

module.exports = app;
