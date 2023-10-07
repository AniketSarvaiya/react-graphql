const { UUIDV4 } = require("sequelize");
const { models } = require("../Sequelize");
const { ErrorTypes } = require("../Helper/ErrorHandling");
const { ErrorHandling } = require("../Helper/ErrorHandling");
const { GraphQLError } = require("graphql");

module.exports = {
  Query: {
    getMovies: async () => {
      const movies = await models.Movie.findAll();
      return movies;
    },
  },
  Mutation: {
    createMovie: async (
      _,
      { movieInput: { title, description, country, poster } }
    ) => {
      const newMovie = await models.Movie.create({
        title,
        description,
        country: country.toUpperCase(),
        poster,
      });
      const movie = {
        id: newMovie.dataValues.id,
        ...newMovie.dataValues,
      };
      console.log("----------------", movie);
      return movie;
    },

    updateMovie: async (
      _,
      { ID, movieInput: { title, description, country, poster } }
    ) => {
      try {
        console.log(ID, title, description, poster, country);
        const findMovie = await models.Movie.findOne({
          where: { id: ID },
        });

        if (!findMovie)
          ErrorHandling("Movie Not Found...", ErrorTypes.BAD_REQUEST);

        let movie = findMovie.dataValues;
        // console.log("==>", findMovie.dataValues);
        const updateMovie = await models.Movie.update(
          {
            title: title || movie.title,
            description: description || movie.description,
            country: country || movie.description,
            poster: poster || movie.poster,
          },
          { where: { id: ID }, returning: true }
        );
        if (!updateMovie)
          ErrorHandling("Server Error...", ErrorTypes.INTERNAL_SERVER_ERROR);

        const { dataValues } = await models.Movie.findOne({
          where: { id: ID },
        });
        return { ...dataValues };
      } catch (error) {
        return error;
      }
    },

    deleteMovie: async (_, { ID }) => {
      const isFound = await models.Movie.findOne({ where: { id: ID } });
      console.log("------>", isFound);
      if (!isFound) {
        ErrorHandling("Movie not found...", ErrorTypes.BAD_REQUEST);
      }
      const isDeleted = await models.Movie.destroy({ where: { id: ID } });
      if (isDeleted) {
        console.log("true", isDeleted);
        return isDeleted;
      } else {
        return isDeleted;
      }
    },
  },
};
