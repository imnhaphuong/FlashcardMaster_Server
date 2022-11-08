const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const unitController = require("../controllers/unitController");

// router.get("/", unitController.getAllUnits);
router.post("/create", unitController.createUnit);
router.post("/getAll", (req, res) => {
  unitController.getAllUnitsCreatedByCreator(req, res);
});
router.post("/array", (req, res) => {
  unitController.getUnitsByArrayId(req, res);
});

router.get("/search/:keyword", (req, res) => {
  unitController.searchUnit(req, res);
});

module.exports = router;