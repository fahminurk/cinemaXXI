

module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define(
    "bookings",
    {
      //user id
      //showtime id
      qty: {
        type: Sequelize.INTEGER,
      },
      total_payment: {
        type: Sequelize.INTEGER,
      },
    },
    { paranoid: true }
  );
  return Booking;
};
