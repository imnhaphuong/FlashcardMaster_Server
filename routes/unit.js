const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const unitController = require("../controllers/unitController");

router.post("/", (req, res) => {
  unitController.getAllUnitsCreatedByCreator(req, res);
})
router.post("/create", unitController.createUnit)


module.exports = router;