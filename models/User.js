const mongoose = require("mongoose");

const Userschema = new mongoose.Schema(
  {
    email: {
        type: String,
        required: true,
        unique: true,
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
      default: "",
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
    role: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "users" }
);

Userschema.index({
  email: "text",
});

module.exports = mongoose.model("users", Userschema);
