const gql = String.raw;

module.exports = gql`
  type Movie {
    id: ID
    title: String!
    description: String!
    country: String!
    poster: String
  }

  input InputMovies {
    title: String
    description: String
    country: String
    poster: String
  }
  type Query {
    getMovies: [Movie]!
    getMovie(ID: ID!): [Movie]
  }

  type Mutation {
    createMovie(movieInput: InputMovies): Movie!
    updateMovie(ID: ID!, movieInput: InputMovies): Movie
    deleteMovie(ID: ID!): Boolean
  }
`;
