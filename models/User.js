const mongoose = require('mongoose')
const Userschema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    fullName: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
        default: '',
    },
    unitCreated: {
        type: Number,
        default: 0,
    },
    flashcardCreated: {
        type: Number,
        default: 0,
    },
    scores: {
        type: Number,
        default: 0,
    },
    dayActive: {
        type: Number,
        default: 0,
    },
    type: {
        type: Number,
        default: 0,
    },
    created: {
        type: Date,
        default: Date.now,
    },

})


module.exports = mongoose.model("user", Userschema)