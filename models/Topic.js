
const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: [
        true,
        "Topic name not provided. Cannot create topic without name",
      ],
    },
    units: [String]
  });
  
  module.exports = mongoose.model("topic", TopicSchema);