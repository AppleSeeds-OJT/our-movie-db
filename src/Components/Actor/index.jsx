import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from '@material-ui/core';
import service from "../../Services/service";

const useStyles = makeStyles((theme) => ({
  imgBackground: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `center`,
    paddingTop: 10,
    backgroundColor: `#4484A4`,
    boxShadow: `2px 2px 5px 0px rgba(0,0,0,1)`,
  },
  image: {
    width: `90%`,
    height: `90%`
  },
  name: {
    marginBottom: 20
  }
}));

function Actor(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    currActor: [],
  });

  useEffect(() => {
    async function getActorById(what, actorName) {
      const gottenActor = await service.searchByKeyword(what, actorName);
      setState((state) => ({...state, currActor: gottenActor.results[0] }));
    } 
    getActorById('actors', props.currActor);
  }, [props.currActor]);

  const getImgUrl = (imgPath) => {
    return `https://image.tmdb.org/t/p/original${imgPath}`;
  };

  return (
    <div>
      {state.currActor && <div>
          <div className={classes.imgBackground}>
            <img className={classes.image} src={getImgUrl(state.currActor.profile_path)} alt="" />
            <Box className={classes.name} fontSize="h6.fontSize" fontWeight="fontWeightBold">{state.currActor.name}</Box>
          </div>
      </div>}
    </div>
  );
}

export default Actor;
