module.exports = (sequelize, Sequelize) => {
  const City = sequelize.define(
    "cities",
    {
      city: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
    }
  );
  return City;
};
