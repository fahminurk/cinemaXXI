module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      avatar_url: {
        type: Sequelize.STRING,
      },
      handphone: {
        type: Sequelize.STRING,
      },
    },
    { paranoid: true }
  );
  return User;
};
