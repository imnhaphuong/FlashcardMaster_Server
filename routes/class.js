const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Class = require("../models/Class");

const controller = require("../controllers/classController");

router.get("/", (req, res) => {
  controller.getAllClasses(req, res);
});
router.get("/", (req, res) => {
  controller.getClassById(req, res);
});

router.post("/create", (req, res) => {
  controller.createClass(req, res);
});

router.post("/delete", (req, res) => {
  controller.deleteClass(req, res);
});

// router.post("/update", (req, res) => {
//   Unit.findByIdAndUpdate(req.body.id, {
//     unit_name: req.body.unit_name,
//     username: req.body.username,
//   })
//     .then((data) => {
//       res.send("updated");
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log("err", err);
//     });
// });

module.exports = router;
