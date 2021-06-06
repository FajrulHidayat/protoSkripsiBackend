const express = require("express");
const router = express.Router();
const { judul,proposal,mahasiswa,hasil,kompren,tutup,sk } = require("../app/controllers");

//judul
router.get("/judul", judul.SelectData);
router.get("/judul/:id", judul.SelectData);
router.post("/judul", judul.InsertData);
router.put("/judul", judul.UpdateData);
router.put("/judul/:id", judul.UpdateData);
router.delete("/judul", judul.DeleteData);
router.delete("/judul/:id", judul.DeleteData);
//proposal
router.get("/proposal", proposal.SelectData);
router.get("/proposal/:id", proposal.SelectData);
router.post("/proposal", proposal.InsertData);
router.put("/proposal", proposal.UpdateData);
router.put("/proposal/:id", proposal.UpdateData);
router.delete("/proposal", proposal.DeleteData);
router.delete("/proposal/:id", proposal.DeleteData);
//mahasiswa
router.get("/mahasiswa", mahasiswa.SelectData);
router.get("/mahasiswa/:id", mahasiswa.SelectData);
router.post("/mahasiswa", mahasiswa.InsertData);
router.put("/mahasiswa", mahasiswa.UpdateData);
router.put("/mahasiswa/:id", mahasiswa.UpdateData);
router.delete("/mahasiswa", mahasiswa.DeleteData);
router.delete("/mahasiswa/:id", mahasiswa.DeleteData);
//hasil
router.get("/hasil", hasil.SelectData);
router.get("/hasil/:id", hasil.SelectData);
router.post("/hasil", hasil.InsertData);
router.put("/hasil", hasil.UpdateData);
router.put("/hasil/:id", hasil.UpdateData);
router.delete("/hasil", hasil.DeleteData);
router.delete("/hasil/:id", hasil.DeleteData);
//kompren
router.get("/kompren", kompren.SelectData);
router.get("/kompren/:id", kompren.SelectData);
router.post("/kompren", kompren.InsertData);
router.put("/kompren", kompren.UpdateData);
router.put("/kompren/:id", kompren.UpdateData);
router.delete("/kompren", kompren.DeleteData);
router.delete("/kompren/:id", kompren.DeleteData);
//tutup
router.get("/tutup", tutup.SelectData);
router.get("/tutup/:id", tutup.SelectData);
router.post("/tutup", tutup.InsertData);
router.put("/tutup", tutup.UpdateData);
router.put("/tutup/:id", tutup.UpdateData);
router.delete("/tutup", tutup.DeleteData);
router.delete("/tutup/:id", tutup.DeleteData);
//sk

router.get("/sk", sk.SelectData);
router.get("/sk/:id", sk.SelectData);
module.exports = router;
