const express = require("express");
const router = express.Router();
const { jfu } = require("../app/controllers");

//jfu
router.get("/", jfu.SelectData);
router.get("/:id", jfu.SelectData);
router.get("/Pembimbing/:id", jfu.SelectPembimbing);
router.get("/Proposal/:id", jfu.SelectProposal);
router.get("/Hasil/:id", jfu.SelectHasil);
router.get("/Komprehensif/:id", jfu.SelectKomprehensif);
router.get("/Munaqasyah/:id", jfu.SelectMunaqasyah);
router.post("/", jfu.Pengajuan);
// router.put("/jfu", jfu.UpdateData);
router.put("/:tentang/:id", jfu.Penomoran);
// router.delete("/jfu", jfu.DeleteData);
// router.delete("/jfu/:id", jfu.DeleteData);


module.exports = router;
