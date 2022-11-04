const Unit = require("../models/Unit");
const Flashcard = require("../models/Unit");
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
    const fcard = req.body.fcards;
    
    const new_unit = new Unit({
      unit_name: req.body.unit_name,
      username: req.body.username,
      mode: req.body.mode,
      flashcards: fcard
    });
    new_unit
      .save()
      .then((data) => {
        res.send(data);
        console.log("create new unit success");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
}
module.exports = unitController;