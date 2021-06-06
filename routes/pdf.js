const express = require("express");
const router = express.Router();
const { generatepdf } = require("../app/controllers");

//judul
router.post("/generate", generatepdf.generate);


module.exports = router;
