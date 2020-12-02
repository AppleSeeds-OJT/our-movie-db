import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MovieCard from "../../Components/MovieCard/index";

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
  });

  useEffect(() => {
  }, []);

  const getReleaseYear = (releaseDate) => {
    return releaseDate.slice(0, 4)
  }

  return (
    <div className={classes.homePage}>
      {props.favMovies && <div className={classes.cardContainer}>
        {props.favMovies.map((movie, index) => (
          <MovieCard key={index} movieId={movie.id} movieReleaseYear={getReleaseYear(movie.release_date)} movieRating={movie.vote_average} movieName={movie.original_title} posterPath={movie.poster_path} />
        ))}
      </div>}
    </div>
  );
}

export default FavoriteMovies;

