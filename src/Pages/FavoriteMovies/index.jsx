import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MovieCard from "../../Components/MovieCard/index";
import service from "../../Services/service";

const useStyles = makeStyles((theme) => ({
  homePage: {
    height: `100vh`,
    marginTop: 40,
  },
  cardContainer: {
    padding: 20,
    display: `grid`,
    gridTemplateColumns: `repeat(auto-fill, minmax(180px, 1fr))`,
    gridAutoRows: `auto`,
    gridGap: `1rem`,
  }
}));

function FavoriteMovies(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    favMovies: null
  });

  useEffect(() => {
    const getMovieDetails = async () => {
        return Promise.all(props.favMovies.map(movie => service.getById('movie', movie)))
    }
    getMovieDetails()
    .then(results => {
        setState(state => ({ ...state, favMovies: results }))
    })
  }, [props.favMovies]);

  const getReleaseYear = (releaseDate) => {
    return releaseDate.slice(0, 4)
  }

  return (
    <div className={classes.homePage}>
      {state.favMovies && <div className={classes.cardContainer}>
        {state.favMovies.map((movie, index) => (
          <MovieCard 
            key={index} 
            movieId={movie.id} 
            movieReleaseYear={getReleaseYear(movie.release_date)} 
            movieRating={movie.vote_average} 
            movieName={movie.original_title} 
            posterPath={movie.poster_path} 
            favMovies={props.favMovies}
            onToggleIsFavorite={props.onToggleIsFavorite}
          />
        ))}
      </div>}
    </div>
  );
}

export default FavoriteMovies;

