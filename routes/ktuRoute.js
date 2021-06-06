const express = require("express");
const router = express.Router();
const { ktu } = require("../app/controllers");

//ktu
router.get("/", ktu.SelectData);
router.get("/:id", ktu.SelectData);
// router.post("/", ksb.Pengajuan);
// router.put("/jfu", jfu.UpdateData);
router.put("/:id", ktu.Acc);
// router.delete("/jfu", jfu.DeleteData);
// router.delete("/jfu/:id", jfu.DeleteData);


module.exports = router;
