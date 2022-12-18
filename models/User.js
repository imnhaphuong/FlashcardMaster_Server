const mongoose = require("mongoose");
const Insignia = require("../models/Insignia")

const Userschema = new mongoose.Schema(
  {
    email: {
        type: String,
        required: true,
    },
    fullname: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/flashcardmaster/image/upload/v1671123911/defaultAvatar_wasqqt.png",
    },
    unitCreated: {
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
    role: {
      type: Number,
      default: 0,
    },
    coin: {
      type: Number,
      default: 0,
    },
    insignia:[{
      type: String,
      ref: Insignia,
    }]
  },
);

Userschema.index({
  email: "text",
});

module.exports = mongoose.model("user", Userschema);
