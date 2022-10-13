const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const controller = require("../controllers/topicController");

router.get("/", (req, res) => {
  controller.getAllTopics(req, res);
},
router.post("/create", (req, res) => {
  controller.createTopic(req, res);
}),
)

module.exports = router;