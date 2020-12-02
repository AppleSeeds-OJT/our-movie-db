import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
  favorite: {
    color: `red`
  },
  cursor: {
    cursor: `pointer`
  }
}));

function Favorite(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    favMovies: null,
    currMovieId: null,
    isFavorite: null
  });

  useEffect(() => {
    setState((state) => ({...state, favMovies: props.favMovies, currMovieId: props.movieId }));
    if (props.favMovies) {
      const isFavMovie = props.favMovies.find((item) => item === props.movieId); 
      if (isFavMovie) {
        setState((state) => ({...state, isFavorite: true })) 
      } else {
        setState((state) => ({...state, isFavorite: false })) 
      }
    }
  }, [props.favMovies, props.movieId]);

  const toggleFavorite = (movieId) => {
    props.onToggleIsFavorite(movieId);
  }

  return (
    <div className={classes.cursor} onClick={() => toggleFavorite(state.currMovieId)}>
      {(state.isFavorite) ? <FavoriteIcon className={classes.favorite}></FavoriteIcon> : <FavoriteBorderIcon></FavoriteBorderIcon> }
    </div>
  );
}

export default Favorite;
