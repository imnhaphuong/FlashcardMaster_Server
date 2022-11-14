const Flashcard = require("../models/Flashcard");
const Unit = require("../models/Unit");
const uploadCloud = require("../utils/cloudinary.config");
const unitController = {
  getAllUnits(req, res) {
    Unit.find({})
      .populate("flashcards")
      .populate("creator")
      .then((data) => {
        console.log("got all units");
        res.send(data);
      })
      .catch((err) => {
        console.log("err", err);
        res.send([]);
      });
  },
  getAllCreatedUnits(req, res) {
    let result = {};
    Unit.find({ creator: req.body.creator, mode: true })
      .populate("flashcards")
      .populate("creator")
      .then((publicData) => {
        console.log("got all created units");
        result.public = publicData;
        Unit.find({ creator: req.body.creator, mode: false })
          .populate("flashcards")
          .populate("creator")
          .then((privateData) => {
            console.log("got all created units");
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
  createUnit(req, res) {
    console.log("create unit");
    const arrFcard = [];
    try {
      const { flashcards } = req.body;
      flashcards.map((item, index) => {
        const new_fcard = new Flashcard({
          term: item.term,
          define: item.define,
          example: item.example,
          image: item.image,
        });
        arrFcard.push(new_fcard._id);
        new_fcard.save();
      });
      const new_unit = new Unit({
        unitName: req.body.unitName,
        creator: req.body.userId,
        fullname: req.body.fullname,
        mode: req.body.mode,
        flashcards: arrFcard,
      });
      new_unit.save().then((data) => {
        res.send(data);
        console.log("create new unit success");
      });
    } catch (err) {
      console.log("err", err);
      res.status(500).send(err);
    }
  },
  //get units are created by creator (use to get units are created by current user/account)
  getAllUnitsCreatedByCreator(req, res) {
    Unit.find({ creator: req.body.creator })
      .then((data) => {
        console.log("got all units created by " + req.body.creator);
        res.send(data);
      })
      .catch((err) => {
        console.log("err", err);
        res.send([]);
      });
  },

  //need to pass an array unit id and
  getUnitById(req, res) {
    Unit.findById(req.body.id)
      .populate("flashcards")
      .then((data) => {
        console.log("got the unit has id " + req.body.id);
        res.send(data);
      })
      .catch((err) => {
        console.log("err", err);
        res.send([]);
      });
  },

  searchUnit(req, res) {
    Unit.aggregate([
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
        console.log("get unit by classname");
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
};
module.exports = unitController;
