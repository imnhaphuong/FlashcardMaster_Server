const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const controller = require("../controllers/unitController");

router.get("/", (req, res) => {
  controller.getAllUnits(req, res);
},
router.post("/create", (req, res) => {
  controller.createUnit(req, res);
})
)

module.exports = router;