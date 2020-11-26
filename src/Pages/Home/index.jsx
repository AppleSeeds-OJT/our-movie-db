import React, { useState, useEffect } from "react";
import { Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import MovieCard from "../../Components/MovieCard/index";
import service from "../../Services/service";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: `grid`,
    gridTemplateColumns: `repeat(auto-fill, minmax(180px, 1fr))`,
    gridAutoRows: `auto`,
    gridGap: `1rem`,
  },
  queryType: {
    marginBottom: 10
  }
}));

function Home() {
  const classes = useStyles();
  const [state, setState] = useState({
    movies: [],
    moviesToShow: 'popular'
  });

  useEffect(() => {
    async function getMovies(moviesToShow) {
        const gottenMovies = await service.query(moviesToShow)
        setState((state) => ({...state, movies: gottenMovies.results }));
      } 
      getMovies(state.moviesToShow);
  }, [state.moviesToShow]);

  const moviesToShow = (param) => {
    setState((state) => ({ ...state, moviesToShow: param }));
  }

  return (
    <div>
      <h2>Top 20 {state.moviesToShow} Movies from TMDB:</h2>
      <div className={classes.queryType}>
        <Button onClick={() => { moviesToShow('latest') }}variant="contained" color={state.moviesToShow === 'latest' ? "primary" : "default"}>Latest</Button>
        <Button onClick={() => { moviesToShow('popular') }}variant="contained" color={state.moviesToShow === 'popular' ? "primary" : "default"}>Popular</Button>
      </div>
      <div className={classes.cardContainer}>
        {state.movies.map((movie, index) => (
          <MovieCard key={index} movieId={movie.id} movieName={movie.original_title} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
}

export default Home;

