import "./App.css";
import { getMovieList, searchMovie } from "./API";
import { useEffect, useState } from "react";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-Wrapper" key={i}>
          <img
            className="Movie-Image"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
            alt="img"
          />
          <div className="Movie-Title">{movie.title}</div>
          <div className="Movie-Date">Release : {movie.release_date}</div>
          <div className="Movie-Rate">{movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  console.log({ popularMovies: popularMovies });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Movieee.</h1>
        <input
          placeholder="Search..."
          className="Movie-Search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-Container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
