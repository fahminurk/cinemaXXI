const db = require("../models");

const theaterController = {
  getAllTheater: async (req, res) => {
    await db.Theater.findAll().then((data) => res.send(data));
  },
};

module.exports = theaterController;
