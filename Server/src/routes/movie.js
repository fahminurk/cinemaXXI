const express = require("express");
const router = express.Router();
const movieController = require("../controllers").movieController;

router.get("/", movieController.getAllMovie);

module.exports = router;