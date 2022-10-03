const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  console.log("got all Useres");
  User.find({})
    .then((data) => {
      console.log("got all");
      res.send(data);
    })
    .catch((err) => {
      console.log("err", err);
    });
});

router.post("/create", (req, res) => {
  const my_user = new User({
    email: req.body.email,
    fullName: req.body.fullName,
    password: req.body.password,
    avatar: req.body.avatar,
    unitCreated: req.body.unitCreated,
    flashcardCreated: req.body.flashcardCreated,
    scores: req.body.scores,
    dayActive: req.body.dayActive,
    type: req.body.type,
  });
  my_user
    .save()
    .then((data) => {
      res.send("created User success");
      console.log(data);
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
