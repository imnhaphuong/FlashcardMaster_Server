const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const unitController = require("../controllers/unitController");

router.get("/", unitController.getAllUnits);
router.post("/create", unitController.createUnit);
router.post("/getAll", (req, res) => {
  unitController.getAllUnitsCreatedByCreator(req, res);
});
router.post("/created", (req, res) => {
  unitController.getAllCreatedUnits(req, res);
});
router.post("/", (req, res) => {
  unitController.getUnitById(req, res);
});

router.get("/search/:keyword", (req, res) => {
  unitController.searchUnit(req, res);
});

module.exports = router;