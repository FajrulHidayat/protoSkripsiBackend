const express = require("express");
const router = express.Router();
const { ksb } = require("../app/controllers");

//ksb
router.get("/", ksb.SelectData);
router.get("/:id", ksb.SelectData);
// router.post("/", ksb.Pengajuan);
// router.put("/jfu", jfu.UpdateData);
router.put("/:id", ksb.Acc);
// router.delete("/jfu", jfu.DeleteData);
// router.delete("/jfu/:id", jfu.DeleteData);


module.exports = router;
