const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [
      true,
      "class name not provided. Cannot create class without name",
    ],
  },
  creator: {
    type: String,
    required: [
      true,
      "Cannot create class without creator",
    ],
  },
  members: [String],
  jcode: {
    type: String,
    trim: true,
    // unique: [true, "code already exists in database!"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("class", ClassSchema);
