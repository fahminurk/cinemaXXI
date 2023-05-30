const express = require("express");
const router = express.Router();
const theaterController = require("../controllers").theaterController;

router.get("/", theaterController.getAllTheater);
router.get("/:id", theaterController.getTheaterById);
router.get("/v1", theaterController.getTheaterByCity);
module.exports = router;
