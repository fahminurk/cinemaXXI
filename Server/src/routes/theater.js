const express = require("express");
const router = express.Router();
const theaterController = require("../controllers").theaterController;

router.get("/", theaterController.getAllTheater);

module.exports = router;
