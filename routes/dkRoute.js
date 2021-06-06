const express = require("express");
const router = express.Router();
const { dk } = require("../app/controllers");

//dk
router.get("/", dk.SelectData);
router.get("/:id", dk.SelectData);
// router.post("/", ksb.Pengajuan);
// router.put("/jfu", jfu.UpdateData);
router.put("/:id", dk.Acc);
// router.delete("/jfu", jfu.DeleteData);
// router.delete("/jfu/:id", jfu.DeleteData);


module.exports = router;
