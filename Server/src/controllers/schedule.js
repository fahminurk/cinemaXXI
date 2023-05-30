const db = require("../models");

const scheduleController = {
  getAllTheater: async (req, res) => {
    await db.Schedule.findAll({
      include: {
        model: db.Theater,
      },
    }).then((data) => res.send(data));
  },
};

module.exports = scheduleController;
