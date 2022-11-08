const mongoose = require('mongoose')

const FcardSchema = new mongoose.Schema({
  term: {
    type: String,
    trim: true,
  },
  define: {
    type: String,
    trim: true,
  },
  example: String,
  image: String,
})

module.exports = mongoose.model("flashcard", FcardSchema)