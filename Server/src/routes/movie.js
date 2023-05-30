const express = require("express");
const router = express.Router();
const movieController = require("../controllers").movieController;

router.get("/", movieController.getAllMovie);

router.get("/playing", movieController.getMoviePlaying);
router.get("/up-coming", movieController.getMovieUpComing);

router.get("/:id", movieController.getMovieById);

module.exports = router;
