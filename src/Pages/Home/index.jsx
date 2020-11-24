import React, { useState, useEffect } from "react";
import Plot from "../../Components/Plot/index";
import service from "../../Services/service";

function Home() {
  const [state, setState] = useState({
    movies: [],
  });

  useEffect(() => {
    service.query().then((results) => {
      setState((state) => ({ ...state, movies: results.results }));
    });
  }, []);

  return (
    <div>
      <h2>Top 20 Movies from TMDB:</h2>
      <ul>
        {state.movies.map((movie, index) => (
          <li key={index}>
            <div className="flex col">
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
