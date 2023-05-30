const db = require("../models");

const theaterController = {
  getAllTheater: async (req, res) => {
    await db.Theater.findAll({ include: [{ model: db.City }] }).then((data) =>
      res.send(data)
    );
  },
  getTheaterById: async (req, res) => {
    await db.Theater.findOne({
      include: [
        {
          model: db.City,
        },
      ],
      where: {
        id: req.params.id,
      },
    }).then((data) => res.send(data));
  },
  getTheaterByCity: async (req, res) => {
    await db.Theater.findAll({
      include: [
        {
          model: db.City,
        },
      ],
      where: {
        id: req.params.id,
      },
    }).then((data) => res.send(data));
  },
};

module.exports = theaterController;
