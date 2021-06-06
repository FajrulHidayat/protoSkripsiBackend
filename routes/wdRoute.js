const express = require("express");
const router = express.Router();
const { wd } = require("../app/controllers");

//wd
router.get("/", wd.SelectData);
router.get("/:id", wd.SelectData);
// router.post("/", ksb.Pengajuan);
// router.put("/jfu", jfu.UpdateData);
router.put("/:id", wd.Acc);
// router.delete("/jfu", jfu.DeleteData);
// router.delete("/jfu/:id", jfu.DeleteData);


module.exports = router;
