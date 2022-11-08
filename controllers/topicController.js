const Topic = require("../models/Topic");
const { findById } = require("../models/Unit");
const Unit = require("../models/Unit")

module.exports = {
    getAllTopics(req, res) {
      Topic.find({})
      .populate('units')
        .then((data) => {
          console.log("got all topics");
          res.send(data);
        })
        .catch((err) => {
          console.log("err", err);
          res.send([]);
        });
    },
    createTopic(req, res) {
      console.log("create topics");
      const new_topic = new Topic({
        name: req.body.name,
        units: req.body.units
      });
      new_topic
        .save()
        .then((data) => {
          res.send(data);
          console.log("create new topic success");
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
}