const express = require("express");
const mongoose = require("mongoose");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/id", userController.getUserByID);
router.post("/create", userController.createUser);
router.post("/signin", userController.signIn);
router.post("/verify-email",userController.verifyEmail);
router.post("/type-class",userController.chooseClass);
router.post("/type-personal",userController.choosePersonal);
router.post("/send-verification", userController.sendVerificationEmaail);

router.post("/signinGG", userController.signIn);
router.get("/search/:keyword", (req, res) => {
  userController.searchUser(req,res);
});
router.get("/", userController.getAllUser);





// router.post("/delete", (req, res) => {
//   Unit.findByIdAndRemove(req.body.id)
//     .then((data) => {
//       res.send("deleted");
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log("err", err);
//     });
// });

// router.post("/update", (req, res) => {
//   Unit.findByIdAndUpdate(req.body.id, {
//     unit_name: req.body.unit_name,
//     username: req.body.username,
//   })
//     .then((data) => {
//       res.send("updated");
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log("err", err);
//     });
// });

module.exports = router;