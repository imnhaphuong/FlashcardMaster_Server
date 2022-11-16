const mongoose = require('mongoose')
const fcard = require('../models/Flashcard')
const user = require('../models/User')
const topic = require('../models/Topic')

const UnitSchema = new mongoose.Schema({
  unitName: {
    type: String,
    trim: true,
    required: [
      true,
    ],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
  },
  fullname: String,
  mode: Boolean,
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true,
  },
  flashcards: [{
    type: String,
    ref: fcard,
  }],
})

UnitSchema.index({
  unitName: "text",
})
 
module.exports = mongoose.model("unit", UnitSchema)



