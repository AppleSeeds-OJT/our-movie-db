import React, { useState, useEffect } from "react";
import service from "../../Services/service";

function Home() {
  const [state, setState] = useState({
    movies: [],
  });

  useEffect(() => {
    service.query().then((results) => {
      //TODO: find a way to create a new "formattedMovies" array, that contains additional information from the OMDB, based on TMDB's top-20 movies' IDs.
      // const formattedMovies = results.results.map(movie => {name: movie.original_title, plot: additionalMovieDetails(movie.id)})
      // setState(state => ({ ...state, movies: formattedMovies }))
      setState((state) => ({ ...state, movies: results.results }));
    });
  }, []);

  function additionalMovieDetails(TMDBid) {
    //this isn't working as planned... can't get the timing right... need to figure out how ASYNC & AWAIT can fix this...
    service.getExternalId(TMDBid)
      .then((res) => service.getById(res.imdb_id))
      .then((result) => console.log(result.Plot));
    return "look at the log...";
  }

  return (
    <div>
      <h2>Top 20 Movies from TMDB:</h2>
      <ul>
        {state.movies.map((movie, index) => (
          <li>
            <div className="flex col" key={index}>
              <div>Movie Name: {movie.original_title}</div>
              <div>Movie Plot: {additionalMovieDetails(movie.id)}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
