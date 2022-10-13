
const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: [
        true,
        "topic name not provided. Cannot create topic without name",
      ],
    },
    units: []
  });
  
  module.exports = mongoose.model("topic", TopicSchema);