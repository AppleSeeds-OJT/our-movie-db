import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from '@material-ui/core';
import service from "../../Services/service";

const useStyles = makeStyles((theme) => ({
rater: {
  color: `#4484A4`,
  // fontWeight: `bold`,
  display: `flex`,
  flexDirection: `column`,
  alignItems: `center`,
  backgroundColor: `rgba(0, 0, 0, 0.4)`,
  padding: `0 10px`,
  borderRadius: 12,
},
}));

function Rating(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    currRating: [],
  });

  useEffect(() => {
    setState((state) => ({...state, currRating: props.currRating }));
  }, [props.currRating]);

  const getRater = (rawRaterName) => { // This will get replaced by their respective logos
    switch(rawRaterName){
      case 'Internet Movie Database':
          return 'IMDB'
      case 'Rotten Tomatoes':
          return 'Rotten'
      case 'Metacritic':
          return 'Meta'
      default:
          return 'other'
    }
  }

  return (
    <div>
      {state.currRating && <div> 
          <div className={classes.rater}>
            <Box className={classes.plot} fontSize="fontSize" fontWeight="fontWeightBold">{getRater(state.currRating.Source)}</Box>
            <Box className={classes.plot} fontSize="fontSize" fontWeight="fontWeightRegular">{state.currRating.Value}</Box>
          </div>
      </div>}
    </div>
  );
}

export default Rating;
