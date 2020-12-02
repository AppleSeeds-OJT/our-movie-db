import React, { useState, useEffect } from "react";
import { useParams} from 'react-router-dom'
import { Box } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Rating from "../../Components/Rating/index"
import Actor from "../../Components/Actor/index"
import Favorite from "../../Components/Favorite/index"
import service from "../../Services/service";

const useStyles = makeStyles((theme) => ({
  moviePage: {
    marginTop: 40,
    backgroundImage: `linear-gradient(rgb(50, 60, 80), rgb(100, 150, 150))`,
    color: `white`
  },
  body: {
    margin: `0 auto`,
    width: `70%`,
    backgroundColor: `#A1C5D8`,
    border: `none`,
    boxShadow: `4px 0px 5px 0px rgba(0,0,0,0.75)`
  },
  backdrop: {
    position: `relative`,
    height: 400,
    backgroundImage: (state) => state.imgUrl,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `100%`,
  },
  movieInfo: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    margin: `0 auto`,
    width: `50%`,
    backgroundColor: `rgba(0, 0, 0, 0.3)`,
    borderRadius: 12,
    padding: 20
  },
  title: {
    fontSize: `2vw`,
    fontWeight: `bold`,
    color: `#A0C4D7`,
    display: `flex`,
  },
  subTitle: {
    fontSize: `1vw`,
    color: `#A0C4D7`,
    display: `flex`
  },
  ratings: {
    marginTop: 20,
    width: `60%`,
    display: `flex`,
    justifyContent: `space-between`
  },
  tagline: {
    margin: 20,
    color: `#2C4464`,
  },
  plot: {
    width: `60%`,
    margin: 20,
    color: `#2C4464`,
  },
  actorsContainer: { //this will need to be converted into a proper carousel...
    padding: 20,
    display: `grid`,
    gridTemplateColumns: `repeat(auto-fill, minmax(180px, 1fr))`,
    gridAutoRows: `auto`,
    gridGap: `1rem`,
  },
  marginLeft: {
    marginLeft: 10
  },
  favorite:{
    position: `absolute`,
    top: 10,
    left: 10
  }
}));

function MovieDetails(props) {
  const { id } = useParams();
  const [state, setState] = useState({
    currMovie: null,
    tagline: null,
    imgUrl: null
  });
  const classes = useStyles(state);

  useEffect(() => {
    async function getMovieById(what, imdbMovieId) {
      const gottenMovie = await service.getById(what, imdbMovieId);
      const movieDetails = await service.getMovieFromOMDBByIMDBId(gottenMovie.imdb_id);
      setState((state) => ({...state, currMovie: movieDetails, tagline: gottenMovie.tagline, imgUrl: getImgUrl(gottenMovie.backdrop_path) }));
    } 
    getMovieById('movie', id);
  }, [id]);

  const getImgUrl = (backdropPath) => {
    return `url("https://image.tmdb.org/t/p/original${backdropPath}")`;
  };

  const formattedActorList = () => {
    return state.currMovie.Actors.split(', ');
  }

  //TODO:
  // add "reviews" by using: https://api.themoviedb.org/3/movie/581392/reviews?api_key=e5a2122bd03016f587131ffe3ecc2596&language=en-US&page=1
  
  return (
    <div className={classes.moviePage}>
      {state.currMovie && <div>
        <div className={classes.body}>
          <div className={classes.backdrop}>
            <div className={classes.favorite}>
              <Favorite favMovies={props.favMovies} onToggleIsFavorite={props.onToggleIsFavorite} movieId={state.currMovie.imdbID} />
            </div>
            <div className={classes.movieInfo}>
              <div className={classes.title}>
                <div>{state.currMovie.Title} </div>
                <div className={classes.marginLeft}>({state.currMovie.Year})</div>
              </div>
              <div className={classes.subTitle}>
                <div>{state.currMovie.Genre} |</div>
                <div className={classes.marginLeft}> {state.currMovie.Runtime} |</div>
                <div className={classes.marginLeft}> {state.currMovie.Language}</div>
              </div>
              <div className={classes.ratings}>
                {state.currMovie.Ratings.map((rating, index) => (
                  <Rating key={index} currRating={rating} />
                ))}
              </div>
            </div>
          </div>
          <Box className={classes.tagline} fontSize="h4.fontSize" fontStyle="italic" fontWeight="fontWeightBold">"{state.tagline}"</Box>
          <Box className={classes.plot} fontSize="h6.fontSize" fontWeight="fontWeightRegular">{state.currMovie.Plot}</Box>
          <div className={classes.actorsContainer}>
            {formattedActorList().map((actor, index) => (
              <Actor key={index} currActor={actor}/>
            ))}
          </div>
          
        </div>
      </div>}
    </div>
  );
}

export default MovieDetails;
