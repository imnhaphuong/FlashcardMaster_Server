const Class = require("../models/Class");
const User = require("../models/User");

module.exports = {
  getAllClasses(req, res) {
    Class.find({})
      .populate("creator")
      .populate("members")
      .populate("units")
      .sort({ created: -1 })
      .then((data) => {
        console.log("got all classes");
        res.send(data);
      })
      .catch((err) => {
        console.log("err", err);
        res.send([]);
      });
  },

  getClassById(req, res) {
    Class.findById(req.body.id)
      .populate("creator")
      .populate("members")
      .populate("units")
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
      .populate("creator")
      .populate("members")
      .populate("units")
      .then((data) => {
        res.send(data);
        console.log("got the class has jcode " + req.body.jcode);
      })
      .catch((err) => {
        console.log("err", err);
      });
  },

  searchClass(req, res) {
    Class.aggregate([
      {
        $match: {
          $text: {
            $search: "/" + req.params.keyword + "/",
          },
        },
      },
    ])
      .then((data) => {
        res.send(data);
        console.log("get class by name");
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
  impUnit(req, res) {
    Class.findByIdAndUpdate(req.body.id, {
      units: req.body.units,
    })
      .then((data) => {
        res.send(data);
        console.log("updated units of the class" + req.body.id);
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
  getClassCreatedByUser(req, res) {
    let result = {};
    Class.find({ creator: req.body.UserId, mode: true })
    .populate("creator")
    .populate("members")
    .populate("units")
      .then((publicData) => {
        console.log("got all created classes public");
        result.public = publicData;
        Class.find({ creator: req.body.UserId, mode: false })
          .populate("creator")
          .populate("members")
          .populate("units")
          .then((privateData) => {
            console.log("got all created classes private");
            result.private = privateData;
            res.send(result);
          })
          .catch((err) => {
            console.log("err", err);
            res.send(result);
          });
      })
      .catch((err) => {
        console.log("err", err);
        res.send([]);
      });
  },
};
