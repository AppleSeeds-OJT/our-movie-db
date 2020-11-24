import React, { useState, useEffect } from "react";
import MovieCard from "../../Components/MovieCard/index";
import Plot from "../../Components/Plot/index";
import service from "../../Services/service";

function Home() {
  const [state, setState] = useState({
    movies: []
  });

  useEffect(() => {
    service.query().then((results) => {
      setState((state) => ({ ...state, movies: results.results }));
    });
  }, []);

  const getImgUrl = (posterPath) => {
      return `url(https://image.tmdb.org/t/p/original${posterPath})`
  }

  return (
    <div>
      <h2>Top 20 Movies from TMDB:</h2>
        {state.movies.map((movie, index) => (
              <MovieCard name={movie.original_title} plot={<Plot movieId={movie.id} />} imgUrl={getImgUrl(movie.poster_path)} />
        ))}
    </div>
  );
}

export default Home;
