const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const controller = require("../controllers/topicController");
router.get("/:id", (req, res) => {
  controller.getTopicsByID(req, res);
}),
router.get("/", (req, res) => {
  controller.getAllTopics(req, res);
}),
router.post("/create", (req, res) => {
  controller.createTopic(req, res);
}),

module.exports = router;