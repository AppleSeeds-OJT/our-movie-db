import React, { useState, useEffect } from "react";
import { useHistory} from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import service from "../../Services/service";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { FullscreenExit } from "@material-ui/icons";

const useStyles = makeStyles({
  movieCard: {
    height: 280,
    backgroundImage: (state) => state.imgUrl,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `100% 100%`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `space-between`
  },
  content: {
    height: `60%`,
    margin: `30px 5px 5px 5px`,
    background: `rgba(255, 255, 255, 0.5)`,
    borderRadius: 4,
    padding: 5
  },
  title: {
    fontSize: 14,
    fontWeight: `bold`
  },
  plot: {
    background: `rgba(230, 200, 230, 0.5)`,
    borderRadius: 4,
    fontSize: `0.75rem`,
    overflow: `hidden`,
    textOverflow: `ellipsis`
  },
  pos: {
    marginBottom: 12,
  },
});

function MovieCard(props) {
  
  const [state, setState] = useState({
    imdbId: null,
    plot: null,
    imgUrl: null
  });

  const getImgUrl = (posterPath) => {
    return `url(https://image.tmdb.org/t/p/original${posterPath})`
  }
  const history = useHistory();
  const classes = useStyles(state);
  
  useEffect(() => {
    async function getMovieByName() {
      const gottenMovie = await service.getByMovieName(props.movieName);
      if (!gottenMovie.Poster) {
        setState((state) => ({...state, imdbId: gottenMovie.id, plot: gottenMovie.Plot, imgUrl: getImgUrl(props.posterPath) }));
      } else {
        setState((state) => ({...state, imdbId: gottenMovie.id, plot: gottenMovie.Plot, imgUrl: `url("${gottenMovie.Poster}")` }));
      }
    } 
    getMovieByName();
  }, [props.movieName, props.posterPath]);

  return (
    <Card className={classes.movieCard}>
      <CardContent className={classes.content}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.movieName}
        </Typography>
        <Typography className={classes.plot}>
          {state.plot}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" size="small" onClick={() => history.push(`/movie/${props.movieId}`)}>Details</Button>
      </CardActions>
    </Card>
  );
}

export default MovieCard;
