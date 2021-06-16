const express = require("express");
const router = express.Router();
const { akun } = require("../app/controllers");

//judul
router.get("/:id", akun.SelectData);


module.exports = router;
