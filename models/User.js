const mongoose = require('mongoose')
const Userschema = new mongoose.Schema({
    email: {
        type: String,
        
    },
    fullName: String,
    password: {
        type: String,


    },
    avatar: String,
    unitCreated: Number,
    flashcardCreated: Number,
    scores: Number,
    dayActive: Number,
    type: {
        type: Number,
    },

})


module.exports = mongoose.model("user", Userschema)