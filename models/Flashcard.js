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
  example: {
    type:String,
    default:"", 
  },
  image: {
    type:String,
    default:"", 
  },
})

module.exports = mongoose.model("flashcard", FcardSchema)