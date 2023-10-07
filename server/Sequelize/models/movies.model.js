const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Movie",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4(),
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      poster: {
        type: DataTypes.STRING,
        defaultValue:
          "https://www.crushpixel.com/big-static14/preview4/movie-poster-1477286.jpg",
        // allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      taleName: "Movie",
    }
  );
};
