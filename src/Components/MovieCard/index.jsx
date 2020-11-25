import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import service from "../../Services/service";

import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  movieCard: {
    backgroundImage: (state) => state.imgUrl,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `100% 100%`
  },
   title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function MovieCard(props) {
  
  const [state, setState] = useState({
    plot: null,
    imgUrl: null,
  });

  const classes = useStyles(state);
  
  useEffect(() => {
    async function getMovieByName() {
      const getMovieByName = await service.getByMovieName(props.movieName)
      setState((state) => ({...state, plot: getMovieByName.Plot, imgUrl: `url("${getMovieByName.Poster}")` }));
    } 
    getMovieByName();
  }, [props.movieName]);

  return (
    <Card className={classes.movieCard}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.movieName}
        </Typography>
        <Typography variant="h5" component="h2">
        </Typography>
        {state.plot}
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default MovieCard;
