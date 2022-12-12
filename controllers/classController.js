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
      members: [req.body.creator],
      jcode: this.makeJCode(12),
    });
    my_class
      .save()
      .then((data) => {
        res.send(data);
        console.log(`create new class ${data.jcode} success`);
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
      .populate({
        path: 'units',
        populate: {
          path: 'creator',
          model: 'user'
        }
      })
      .then((data) => {
        res.send(data);
        console.log("got the class has jcode " + req.body.jcode);
      })
      .catch((err) => {
        console.log("err", err);
      });
  },

  searchClass(req, res) {
    Class.find({ mode: true, name: { '$regex': req.body.keyword, '$options': 'i' } })
      .populate("creator")
      .populate("members")
      .populate("units")
      .then((data) => {
        console.log("got the classes has name extend " + req.body.keyword);
        res.send(data);
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
  getAllCreatedClasses(req, res) {
    let result = {};
    Class.find({ creator: req.body.creator, mode: true })
      .populate("creator")
      .populate("members")
      .populate("units")
      .then((publicData) => {
        console.log("got all created classes public");
        result.public = publicData;
        Class.find({ creator: req.body.creator, mode: false })
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
  join(req, res) {
    Class.findByIdAndUpdate(req.body.id, {
      $addToSet: { members: req.body.member },
    })
      .then((data) => {
        console.log("updated members of the class" + req.body.id);
        res.send(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
  kick(req, res) {
    Class.findByIdAndUpdate(req.body.id, {
      $pull: { members: req.body.member },
    })
      .then((data) => {
        res.send(data);
        console.log("updated members of the class" + req.body.id);
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
  makeJCode(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_-+=";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
};
