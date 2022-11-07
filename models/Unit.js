const mongoose = require('mongoose')

const UnitSchema = new mongoose.Schema({
  unitName: {
    type: String,
    trim: true,
    required: [
      true,
      "Topic name not provided. Cannot create topic without name",
    ],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fullname: String,
  mode: Boolean,
  flashcards: [],
})

module.exports = mongoose.model("unit", UnitSchema)




