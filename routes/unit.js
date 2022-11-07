const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const unitController = require("../controllers/unitController");

router.get("/",unitController.getAllUnits)
router.post("/create", unitController.createUnit)


module.exports = router;