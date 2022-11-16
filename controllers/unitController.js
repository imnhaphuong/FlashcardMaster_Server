const Flashcard = require("../models/Flashcard");
const Topic = require("../models/Topic");
const Unit = require("../models/Unit");
const unitController = {
  getAllUnits(req, res) {
    Unit.find({})
      .populate("flashcards")
      .populate("creator")
      .populate("topic")
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
  createUnit: async(req, res) =>{
    console.log("create unit");
    const arrFcard = [];
    try {
      const { flashcards, topic } = req.body
      console.log("topic", topic)
      if (topic === "") {
        return res.json({ status: 'error', error: 'Vui lòng chọn một chủ đề' })
      }
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
        topic: topic,
        flashcards: arrFcard,
      });
      const add_Topic = await Topic.findById(topic)
      add_Topic.units.push(new_unit._id)
      add_Topic.save()
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
  updateUnit: async (req, res) => {
    const { _id, flashcards, topic, unitName, mode } = req.body;

    console.log("req.body", req.body)
    try {
      const unit = await Unit.findById(_id)
      unit.unitName = unitName;
      unit.mode = mode;
      if (unit.topic !== topic.value) {
        //remove
        const re_Topic = await Topic.findById(unit.topic)
        var index = re_Topic.units.indexOf(unit._id.toString())
        if (index !== -1) {
          re_Topic.units.splice(index, 1);
        }
        re_Topic.save().catch((err) => {
          console.log(err)
        });
        unit.topic = topic;
        const {value}=topic
        console.log("topic",topic)
        console.log("value",value)

        const add_Topic = await Topic.findById(topic)
        console.log("add_Topic",add_Topic)     
        add_Topic.units.push(unit._id)
        add_Topic.save().catch((err) => {
          console.log(err)
        });
      }

      flashcards.map(async (item, index) => {
        console.log("sdfafdsf");
        const fcard = await Flashcard.findById(item._id)
        if (!fcard) {
          const new_fcard = new Flashcard({
            term: item.term,
            define: item.define,
            example: item.example,
            image: item.image,
          });
          unit.flashcards.push(new_fcard._id);
          console.log("new", unit.flashcards)
          new_fcard.save();
        } else {
          fcard.term = item.term;
          fcard.define = item.define;
          fcard.example = item.examplep;
          fcard.image = item.image;
          console.log("old")
          fcard.save().catch((err) => {
            console.log(err)
          });
        }
      });
      setTimeout(() => {
        unit.save().
          then((data) => {
            res.status(200).send(data);
            console.log("update new class success");
          })
      }, 2000)

    } catch (err) {
      console.log("err", err);
      res.status(500).send(err);
    };
  },
  deleteUnit: async (req, res) => {
    const { _id } = req.body
    try {
      await Unit.findByIdAndDelete(_id).populate("flashcards")
      return res.json({ status: '200', message: 'Xóa thành công' })
    } catch (err) {
      console.log("err", err);
      res.status(500).send(err);
    };

  },

  addToClass(req, res) {
    Unit.findByIdAndUpdate(req.body.id, {
      $addToSet: { classes: req.body.class },
    })
      .then((data) => {
        console.log("updated classes of the unit " + req.body.id);
        res.send(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
};
module.exports = unitController;
