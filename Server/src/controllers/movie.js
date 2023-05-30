const db = require("../models");

const movieController = {
  getAllMovie: async (req, res) => {
    await db.Movie.findAll().then((data) => res.send(data));
  },
  getMoviePlaying: async (req, res) => {
    await db.Movie.findAll({
      where: {
        status: "PLAYING",
      },
    }).then((data) => res.send(data));
  },
  getMovieUpComing: async (req, res) => {
    await db.Movie.findAll({
      where: {
        status: "UP-COMING",
      },
    }).then((data) => res.send(data));
  },
  getMovieById: async (req, res) => {
    await db.Movie.findOne({
      where: {
        id: req.params.id,
      },
    }).then((data) => res.send(data));
  },
};

module.exports = movieController;
