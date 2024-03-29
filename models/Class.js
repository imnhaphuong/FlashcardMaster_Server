const mongoose = require("mongoose");
const User = require("../models/User");
const Unit = require("../models/Unit");

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
    type: mongoose.Types.ObjectId,
    required: [
      true,
      "creator not provided. Cannot create class without creator",
    ],
    ref: User,
  },
  members: [
    {
      type: mongoose.Types.ObjectId,
      ref: User,
    },
  ],
  units: [
    {
      type: mongoose.Types.ObjectId,
      ref: Unit,
    },
  ],
  jcode: {
    type: String,
    trim: true,
    unique: [true, "code already exists in database!"],
  },
  created: {
    type: Date,
    default: Date.now,
  },

  //mode = false private
  //mode = true public
  mode: {
    type: Boolean,
  },
});
ClassSchema.index({
  name: "text",
})

module.exports = mongoose.model("class", ClassSchema);
