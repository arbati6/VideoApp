import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

import "./App.css";
import SearchIcon from "./search.svg";
import Logo from "./ino-logo.svg";
const API_URL = "http://www.omdbapi.com?apikey=906159bb";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const result = () => {
    searchMovies(searchTerm);
    setSearchResult(searchTerm);
  };

  const searchMovies = async (title) => {
    let response = await fetch(`${API_URL}&s=${title}`);
    let data = await response.json();
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies("Movie");
  }, []);

  return (
    <div className="app">
      <div className="container2">
        <img className="logo" src={Logo} alt="logo" />
        <div className="search">
            <input
              placeholder="Search for movies"
              value={searchTerm}
              onInput={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => (e.keyCode === 13) ? result() : null}
            />
            <img src={SearchIcon} alt="search" onClick={result} />
        </div>

        <h2>
          Result for: <strong>{searchResult}</strong>
        </h2>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard key={movie.Title} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
