const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Class = require("../models/Class");

router.get("/", (req, res) => {
  console.log("got all classes");
  Class.find({})
    .then((data) => {
      console.log("got all");
      res.send(data);
    })
    .catch((err) => {
      console.log("err", err);
    });
});

router.post("/create", (req, res) => {
  const my_class = new Class({
    name: req.body.name,
    creator: req.body.creator,
  });
  my_class
    .save()
    .then((data) => {
      res.send(data);
      console.log('create new class success');
    })
    .catch((err) => {
      console.log("err", err);
    });
});

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
