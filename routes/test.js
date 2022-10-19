
/* const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Unit = require("../models/Unit");

router.get("/", (req, res) => {
  Unit.find({})
    .then((data) => {
      console.log("got all unit TEST");
      res.send(data);
    })
    .catch((err) => {
      console.log("err", err);
    });
});

router.post("/send", (req, res) => {
  const unit = new Unit({
    unit_name: req.body.unit_name,
    username: req.body.username,
  });
  unit
    .save()
    .then((data) => {
      res.send("add success TEST");
      console.log(data);
    })
    .catch((err) => {
      console.log("err", err);
    });
});

router.post("/delete", (req, res) => {
  Unit.findByIdAndRemove(req.body.id)
    .then((data) => {
      res.send("deleted TEST");
      console.log(data);
    })
    .catch((err) => {
      console.log("err", err);
    });
});

router.post("/update", (req, res) => {
  Unit.findByIdAndUpdate(req.body.id, {
    unit_name: req.body.unit_name,
    username: req.body.username,
  })
    .then((data) => {
      res.send("updated TEST");
      console.log(data);
    })
    .catch((err) => {
      console.log("err", err);
    });
});

module.exports = router;
*/
