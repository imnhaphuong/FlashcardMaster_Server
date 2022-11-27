const express = require("express");
const mongoose = require("mongoose");
const userController = require("../controllers/userController");
const router = express.Router();
const User = require("../models/User");

router.post("/id", userController.getUserByID);
router.post("/create", userController.createUser);
router.post("/signin", userController.signIn);
router.post("/verify-email", userController.verifyEmail);
router.post("/type-class", userController.chooseClass);
router.post("/type-personal", userController.choosePersonal);
router.post("/send-verification", userController.sendVerificationEmaail);

router.post("/signinGG", userController.signIn);
router.get("/search/:keyword", (req, res) => {
  userController.searchUser(req, res);
});
router.get("/", userController.getAllUser);


module.exports = router;
