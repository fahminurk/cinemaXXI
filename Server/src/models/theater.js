module.exports = (sequelize, Sequelize) => {
  const Theater = sequelize.define(
    "theaters",
    {
      name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
    }
  );
  return Theater;
};
