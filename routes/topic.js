const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const controller = require("../controllers/topicController");

router.get("/", controller.getAllTopics)
router.post("/create", (req, res) => {
  controller.createTopic(req, res);
}),

module.exports = router;