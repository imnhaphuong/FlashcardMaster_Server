const mongoose = require("mongoose");
const Unit = require("../models/Unit")

const TopicSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: [
        true,
        "Topic name not provided. Cannot create topic without name",
      ],
    },
    units: [{
      type: String,
      ref: Unit,
    }]
  });
  
  module.exports = mongoose.model("topic", TopicSchema);