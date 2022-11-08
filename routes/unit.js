const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const unitController = require("../controllers/unitController");

router.get("/",unitController.getAllUnits)
router.post("/create", unitController.createUnit)


router.get("/search/:keyword", (req, res) => {
  unitController.searchUnit(req, res);
});

module.exports = router;