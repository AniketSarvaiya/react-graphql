import logo from "./logo.svg";
import "./App.css";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_MOVIE, GET_ALL_MOVIES } from "./Graphql/Queries";
import { useEffect, useState } from "react";
import Naruto from "./Assets/Naruto.jpg";

function App() {
  const [movies, setMovies] = useState([]);
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    poster: "",
    country: "",
  });
  const { data, error, loading, refetch } = useQuery(GET_ALL_MOVIES);

  const [
    createMovie,
    {
      data: createMovieData,
      error: createMovieError,
      loading: createMovieLoading,
    },
  ] = useMutation(CREATE_MOVIE);

  useEffect(() => {
    if (createMovieLoading) console.log(createMovieLoading);
    if (createMovieError) console.log(createMovieError.message);
    if (createMovieData) console.log(createMovieData);
    console.log("------------>", data?.getMovies);
  }, [createMovieError, createMovieLoading, createMovieData, data]);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInitialValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(initialValues);
  };

  return (
    <div className="App">
      {loading && <h1>Loading...</h1>}

      {movies && (
        <div className="main-container">
          <form
            onSubmit={() => {
              createMovie({
                variables: {
                  movieInput: {
                    title: initialValues.title,
                    description: initialValues.description,
                    poster: initialValues.poster,
                    country: initialValues.country,
                  },
                },
              });
              refetch();
              setInitialValues("");
            }}
          >
            <div style={{ marginTop: "20px" }}>
              {"Title : "}
              <input
                type="text"
                name="title"
                value={initialValues.title}
                placeholder="Enter Movie Titile"
                onChange={onChangeHandler}
              />
              <br></br>
              {"Description : "}
              <input
                type="text"
                name="description"
                value={initialValues.description}
                placeholder="Enter Movie Titile"
                onChange={onChangeHandler}
              />
              <br></br>
              {"Country: "}
              <input
                type="text"
                name="country"
                value={initialValues.country}
                placeholder="Enter Movie Titile"
                onChange={onChangeHandler}
              />
              <br></br>
              {"Poster: "}
              <input
                type="text"
                name="poster"
                value={initialValues.poster}
                placeholder="Enter Movie Titile"
                onChange={onChangeHandler}
              />
              <br></br>
              <button type="ssubmit">Create User </button>
            </div>
          </form>
          <h1 style={{ marginTop: "40px", marginBottom: "40px" }}>
            Movie Record
          </h1>
          <table
            align="center"
            width={"900px"}
            border={1}
            style={{ borderCollapse: "collapse" }}
          >
            <thead
              style={{
                backgroundColor: "black",
                color: "white",
              }}
            >
              <tr>
                <th style={{ padding: "10px" }}>ID</th>
                <th>POSTER</th>
                <th>TITLE</th>
                <th>DESCRIPTION</th>
                <th>COUNTRY</th>
              </tr>
            </thead>
            <tbody>
              {data?.getMovies?.map((movie) => {
                console.log(movie.poster);
                return (
                  <tr key={movie.id}>
                    <td>{movie.id}</td>
                    <td>
                      <img
                        height={"200px"}
                        // src="https://media.istockphoto.com/id/1244034031/vector/cinema-poster-with-cola-film-strip-and-clapper-vector.jpg?s=612x612&w=0&k=20&c=JN4E5qJgcq3qm89rSc2BIJT6AZ80MvRJie__r3OENY8="
                        src={movie.poster}
                        alt="movie poster"
                      />
                    </td>
                    <td>{movie.title}</td>
                    <td>{movie.description}</td>
                    <td>{movie.country}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* {data?.getMovies.map((movie) => {
              console.log(movie.title);
              <h2>{movie.title}</h2>;
            })} */}
        </div>
      )}
    </div>
  );
}

export default App;

// echo "# react-graphql" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/AniketSarvaiya/react-graphql.git
// git push -u origin main
