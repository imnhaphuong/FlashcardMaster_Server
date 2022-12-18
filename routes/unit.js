const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const unitController = require("../controllers/unitController");

router.get("/", unitController.getAllUnits);
router.post("/create", unitController.createUnit);

router.post("/created", (req, res) => {
  unitController.getAllCreatedUnits(req, res);
});
router.post("/id", (req, res) => {
  unitController.getUnitById(req, res);
});

router.get("/search/:keyword", (req, res) => {
  unitController.searchUnit(req, res);
});
router.put("/update", unitController.updateUnit);
router.post("/deleted", unitController.deleteUnit);

router.post("/deFcard", unitController.deleteFcard);
router.post("/add", (req, res) => {
  unitController.addToClass(req, res);
});

module.exports = router;