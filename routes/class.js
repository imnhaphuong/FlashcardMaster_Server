const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Class = require("../models/Class");

const controller = require("../controllers/classController");


router.post("/create", (req, res) => {
  controller.createClass(req, res);
});

router.post("/delete", (req, res) => {
  controller.deleteClass(req, res);
});

router.post("/update", (req, res) => {
  controller.updateClass(req, res);
});

router.get("/search/:keyword", (req, res) => {
  controller.searchClass(req, res);
});
router.get("/", (req, res) => {
  controller.getAllClasses(req, res);
});

router.post("/", (req, res) => {
  if (req.body.hasOwnProperty("jcode")) {
    controller.getClassByJCode(req, res);
  } else if (req.body.hasOwnProperty("id")) {
    controller.getClassById(req, res);
  }
});

module.exports = router;

