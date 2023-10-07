import { gql } from "@apollo/client";

export const GET_ALL_MOVIES = gql`
  query GetMovies {
    getMovies {
      id
      title
      description
      country
      poster
    }
  }
`;

export const CREATE_MOVIE = gql`
  mutation Mutation($movieInput: InputMovies) {
    createMovie(movieInput: $movieInput) {
      title
      description
      country
      poster
      id
    }
  }
`;
