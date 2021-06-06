const express = require("express");
const router = express.Router();
const { email } = require("../app/controllers");

//judul
router.post("/", email.regis);


module.exports = router;
