import React, { useState, useEffect } from "react";
import Plot from "../../Components/Plot/index";
import service from "../../Services/service";

function Home() {
  const [state, setState] = useState({
    movies: []
  });

  useEffect(() => {
    service.query().then((results) => {
        console.log(results.results);
      setState((state) => ({ ...state, movies: results.results }));
    });
  }, []);

  const getImgUrl = (posterPath) => {
      return `https://image.tmdb.org/t/p/original/${posterPath}`
  }

  return (
    <div>
      <h2>Top 20 Movies from TMDB:</h2>
      <ul>
        {state.movies.map((movie, index) => (
          <li key={index}>
            <div className="flex col">
              <div><img className="poster" src={getImgUrl(movie.poster_path)} alt=""/></div>
              <div>Movie Name: {movie.original_title}</div>
              <Plot movieId={movie.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
