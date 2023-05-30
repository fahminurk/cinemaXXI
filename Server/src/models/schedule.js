module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define(
    "schedules",
    {
      time1: { type: Sequelize.STRING },
      time2: { type: Sequelize.STRING },
      time3: { type: Sequelize.STRING },
      price: { type: Sequelize.STRING },
      date: { type: Sequelize.STRING },
    },
    { paranoid: true }
  );
  return Schedule;
};
