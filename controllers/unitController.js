const Flashcard = require("../models/Flashcard");
const Unit = require("../models/Unit");
const uploadCloud = require("../utils/cloudinary.config")
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
    const arrFcard =[];
    try {
      const { flashcards } = req.body
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
        flashcards:arrFcard,
        
      });
      new_unit
        .save()
        .then((data) => {
          res.send(data);
          console.log("create new unit success");
        })
    } catch (err) {
      console.log("err", err);
      res.status(500).send(err)
    }
  }


}
module.exports = unitController;