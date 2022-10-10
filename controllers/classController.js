const Class = require("../models/Class");

module.exports = {
  getAllClasses(req, res) {
    console.log("got all classes");
    Class.find({})
      .then((data) => {
        console.log("got all");
        res.send(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  },

  createClass(req, res) {
    const my_class = new Class({
      name: req.body.name,
      creator: req.body.creator,
      mode: req.body.mode,
    });
    my_class
      .save()
      .then((data) => {
        res.send(data);
        console.log("create new class success");
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
};
