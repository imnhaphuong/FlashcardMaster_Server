const Class = require("../models/Class");

module.exports = {
  getAllClasses(req, res) {
    Class.find({})
      .sort({ created: -1 })
      .then((data) => {
        console.log("got all classes");
        res.send(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  },

  getClassById(req, res) {
    Class.findById(req.body.id)
      .then((data) => {
        console.log("got the class has id " + req.body.id);
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
  deleteClass(req, res) {
    Class.findByIdAndRemove(req.body.id)
      .then((data) => {
        console.log("deleted");
        res.send([]);
      })
      .catch((err) => {
        console.log("err", err);
      });
  },

  updateClass(req, res) {
    Class.findByIdAndUpdate(req.body.id, {
      name: req.body.name,
      mode: req.body.mode,
    })
      .then((data) => {
        res.send(data);
        console.log("updated" + req.body.name);
      })
      .catch((err) => {
        console.log("err", err);
      });
  },

  getClassByJCode(req, res) {
    Class.find({ jcode: req.body.jcode })
      .then((data) => {
        res.send(data);
        console.log("got the class has jcode " + req.body.jcode);
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
};






