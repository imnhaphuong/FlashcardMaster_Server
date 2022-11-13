const mongoose = require("mongoose");
const fcard = require("../models/Flashcard");
const User = require("../models/User");
const UnitSchema = new mongoose.Schema({
  unitName: {
    type: String,
    trim: true,
    required: [true],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  fullname: String,
  mode: Boolean,
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
  },
  flashcards: [
    {
      type: String,
      ref: fcard,
    },
  ],
});

UnitSchema.index({
  unitName: "text",
});

module.exports = mongoose.model("unit", UnitSchema);
