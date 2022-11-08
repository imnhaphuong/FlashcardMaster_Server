const mongoose = require("mongoose");
const User = require("../models/User");
const Unit = require("../models/Unit");

function makeJCode(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

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
    default: makeJCode(12),
  },
  created: {
    type: Date,
    default: Date.now,
  },

  //mode = 0 private
  //mode = 1 public
  mode: {
    type: Number,
  },
});

module.exports = mongoose.model("class", ClassSchema);
