const mongoose = require('mongoose')
const fcard = require('../models/Flashcard')
const user = require('../models/User')

const UnitSchema = new mongoose.Schema({
  unitName: {
    type: String,
    trim: true,
    required: [true],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
  },
  fullname: String,
  mode: Boolean,
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  flashcards: [
    {
      type: String,
      ref: fcard,
    },
  ],
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

UnitSchema.index({
  unitName: "text",
});

module.exports = mongoose.model("unit", UnitSchema);
