const express = require("express");
const router = express.Router();
const { komen } = require("../app/controllers");

router.get("/", komen.SelectData);
router.get("/:id", komen.SelectData);
router.post("/", komen.InsertData);
router.put("/", komen.UpdateData);
router.put("/:id", komen.UpdateData);
router.delete("/", komen.DeleteData);
router.delete("/:id", komen.DeleteData);

module.exports = router;
