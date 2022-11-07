const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const unitController = require("../controllers/unitController");

router.get("/", (req, res) => {
  unitController.getAllUnits(req, res);
})
router.post("/create", unitController.createUnit)

router.get("/search", (req, res) => {
  unitController.searchUnit(req, res);
});


module.exports = router;