const Topic = require("../models/Topic");


module.exports = {
    getAllTopics(req, res) {
      Topic.find({})
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
}