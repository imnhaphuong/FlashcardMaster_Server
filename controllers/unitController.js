const Flashcard = require("../models/Flashcard");
const Unit = require("../models/Unit");
const uploadCloud = require("../utils/cloudinary.config");
const unitController = {
  getAllUnits(req, res) {
    Unit.find({})
      .populate('flashcards')
      .then((data) => {
        console.log("got all units");
        res.send(data);
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
      const { flashcards,topic } = req.body
      if(topic ==="") return res.json({ status: 'error', error: 'Vui lòng chọn một chủ đề' })
      flashcards.map((item, index) => {
        const new_fcard = new Flashcard({
          term: item.term,
          define: item.define,
          example: item.example,
          image: item.image,
        });
        arrFcard.push(new_fcard._id);
        new_fcard.save();
      })
      const new_unit = new Unit({
        unitName: req.body.unitName,
        creator: req.body.userId,
        fullname: req.body.fullname,
        mode: req.body.mode,
        topic:req.body.topic,
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
  getUnitsByArrayId(req, res) {
    console.log(req.body.id);
    Unit.find({})
      .where("_id")
      .in(req.body.id)
      .then((data) => {
        console.log("got all units created by " + req.body.id);
        res.send(data);
      })
      .catch((err) => {
        console.log("err", err);
        res.send([]);
      });
  },


  searchUnit(req, res) {
    Unit.aggregate([{
      $match: {
        $text: {
          $search: "/" + req.params.keyword + "/"
        },
      }
    }])
      .then((data) => {
        res.send(data);
        console.log("get unit by classname");
      })
      .catch((err) => {
        console.log("err", err);
      })
  }
}
module.exports = unitController;
