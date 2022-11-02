const mongoose = require('mongoose')

const UnitSchema = new mongoose.Schema({
  unit_name: {
    type: String,
    trim: true,
    required: [
      true,
      "Topic name not provided. Cannot create topic without name",
    ],
  },
  fullname: String,
  mode: Boolean,
  flashcards: [],
})

module.exports = mongoose.model("unit", UnitSchema)




