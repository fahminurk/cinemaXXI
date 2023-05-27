module.exports = (sequelize, Sequelize) => {
  const ShowTime = sequelize.define(
    "showTimes",
    {
      //movie_id
      //cinema_id
      time: {
        type: Sequelize.DATE,
      },
      date: {
        type: Sequelize.STRING,
      },
      price: {
        //harga tiket
        type: Sequelize.STRING,
      },
      seat: {
        type: Sequelize.STRING,
      },
      //jumlah kursi tersedia
    },
    { paranoid: true }
  );
  return ShowTime;
};
