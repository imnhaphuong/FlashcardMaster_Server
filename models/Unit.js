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

UnitSchema.index({
  unitName: "text",
})

module.exports = mongoose.model("unit", UnitSchema)




