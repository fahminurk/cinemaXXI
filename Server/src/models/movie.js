module.exports = (sequelize, Sequelize) => {
  const Movie = sequelize.define(
    "movies",
    {
      title: { type: Sequelize.STRING },
      genre: { type: Sequelize.STRING },
      rated: { type: Sequelize.STRING },
      duration: { type: Sequelize.STRING },
      format: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING(500) },
      producer: { type: Sequelize.STRING },
      director: { type: Sequelize.STRING },
      writer: { type: Sequelize.STRING },
      cast: { type: Sequelize.STRING },
      distributor: { type: Sequelize.STRING },
      website: { type: Sequelize.STRING },
      image_url: { type: Sequelize.STRING },
      status: {
        type: Sequelize.ENUM("PLAYING", "UP-COMING"),
      },
    },
    { paranoid: true }
  );
  return Movie;
};
