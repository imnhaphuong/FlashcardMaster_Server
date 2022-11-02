const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const unitController = require("../controllers/unitController");

router.get("/", (req, res) => {
  controller.getAllUnits(req, res);
})
router.post("/create", unitController.createUnit)


module.exports = router;