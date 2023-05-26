const db = require("../models");

const cityController = {
  getAllCity: async (req, res) => {
    await db.City.findAll().then((data) => res.send(data));
  },
};

module.exports = cityController;
