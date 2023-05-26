const db = require("../models");

const movieController = {
  getAllMovie: async (req, res) => {
    await db.Movie.findAll().then((data) => res.send(data));
  },
};

module.exports = movieController;
