const Topic = require("../models/Topic");
const { findById } = require("../models/Unit");

module.exports = {
  getAllTopics(req, res) {
    Topic.find({})
      .populate({
        match: { mode: true },
        path: 'units',
        populate: {
          path: 'creator',
          model: 'user'
        }
      })
      .then((data) => {
        console.log("got all topics");
        res.send(data);
      })
      .catch((err) => {
        console.log("err", err);
        res.send([]);
      });
  },
  getTopicsByName(req, res) {
    Topic.find({name: req.body.name})
      .populate({
        path: 'units',
        populate: {
          path: 'creator',
          model: 'user'
        }
      })
      .then((data) => {
        console.log("got topics by name is " + req.body.name);
        res.send(data);
      })
      .catch((err) => {
        console.log("err", err);
        res.send([]);
      });
  },
  getTopicsByID(req, res) {
    Topic.findById(req.params.id)
      .populate("units")
      .then((data) => {
        console.log("get topic by topic_id");
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
      units: req.body.units,
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
  },

};

