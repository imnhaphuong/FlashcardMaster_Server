const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Class = require("../models/Class");

const controller = require("../controllers/classController");

router.get("/", (req, res) => {
  controller.getAllClasses(req, res);
});

router.post("/create", controller.createClass(req, res));

// router.post("/delete", (req, res) => {
//   Unit.findByIdAndRemove(req.body.id)
//     .then((data) => {
//       res.send("deleted");
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log("err", err);
//     });
// });

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
