const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const controller = require("../controllers/insigniaController");
router.get("/", (req, res) => {
    controller.getAllInsignias(req, res);
}),
    module.exports = router;　
   