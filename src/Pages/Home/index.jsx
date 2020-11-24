import React, { useState, useEffect } from "react";
import MovieCard from "../../Components/MovieCard/index";
import Plot from "../../Components/Plot/index";
import service from "../../Services/service";
import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
    width: 1200,
  }
});
function Home() {
  const classes = useStyles();

  const [state, setState] = useState({
    movies: []
  });

  useEffect(() => {
    service.query('popular').then((results) => {
      setState((state) => ({ ...state, movies: results.results }));
    });
  }, []);

  const getImgUrl = (posterPath) => {
      return `url(https://image.tmdb.org/t/p/original${posterPath})`
  }

  return (
    <div>
      <h2>Top 20 Movies from TMDB:</h2>
      <div className={classes.cardContainer}>
        {state.movies.map((movie, index) => (
            <MovieCard name={movie.original_title} plot={<Plot movieId={movie.id} />} imgUrl={getImgUrl(movie.poster_path)} />
        ))}
      </div>  
    </div>
  );
}

export default Home;
