const express = require("express");
const mongoose = require("mongoose");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/id", userController.getUserByID);
router.post("/create", userController.createUser);
router.post("/signin", userController.signIn);
router.post("/verify-email", userController.verifyEmail);
router.post("/type-class", userController.chooseClass);
router.post("/type-personal", userController.choosePersonal);
router.post("/send-verification", userController.sendVerificationEmaail);
router.post("/sendVerifyAgain", userController.sendVerificationEmailAgain);
router.post("/verifyEmailAgain", userController.verifyEmailAgain);
router.post("/changepassword", userController.changePassword);
router.post("/signinGG", userController.signIn);
router.post("/updateFullname",userController.updateFullname);
router.post("/updateEmail",userController.updateEmail);
router.post("/keyword", userController.searchUser);
router.get("/", userController.getAllUser);


module.exports = router;
