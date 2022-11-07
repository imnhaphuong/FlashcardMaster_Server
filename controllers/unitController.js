const Unit = require("../models/Unit");
const uploadCloud = require("../utils/cloudinary.config")
const unitController = {
  getAllUnits(req, res) {
    Unit.find({})
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

    try {      
      const new_unit = new Unit({
        unitName: req.body.unitName,
        creator: req.body.userId,
        fullname: req.body.fullname,
        mode: req.body.mode,
        flashcards: req.body.flashcards

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