import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';
import MovieIcon from '@material-ui/icons/Movie';
import PersonIcon from '@material-ui/icons/Person';
import service from "../../Services/service";

const useStyles = makeStyles((theme) => ({
    hit: {
        border: `1px solid white`,
        color: `white`
    },
    flex: {
        display: `flex`,
    },
    image: {
        border: `1px solid white`,
        margin: 5,
        width: 50
    },
    details: {
        display: `flex`,
        flexDirection: `column`,
        padding: 5
    },
    rating: {
        display: `flex`,
        alignItems: `center`,
    },
    star: {
        marginRight: 10,
        color: `yellow`
    },
    icon: {
        marginRight: 10,
    }
}));

function Search(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    isMovie: null,  
    currItem: null
  });

  useEffect(() => {
    async function getHitInfo(isMovie, id) {
        setState((state) => ({ ...state, isMovie }));
        let gottenItem = {};
        if (isMovie) {
            console.log('fetching this movieId: ', id);
            gottenItem = await service.getById('movie',id);
            if (!gottenItem) console.log('this movieItem could not be fetched: ', id);
            console.log('this is the gottenItem: ', gottenItem);
            setState((state) => ({ ...state, currItem: gottenItem }));
        } else if (!isMovie) {
            console.log('fetching this actorId: ', id);
            gottenItem = await service.getById('actor',id);
            if (!gottenItem) console.log('this actorItem could not be fetched: ', id);
            console.log('this is the gottenItem: ', gottenItem);
            setState((state) => ({ ...state, currItem: gottenItem }));
        }
        // TODO: Handle case where "gottenItem" is undefined (because of 404 on TMDB on that specific ID...)
      }
      getHitInfo(props.isMovie, props.hitId);
  }, []);

  const getReleaseYear = (releaseDate) => {
    return releaseDate.slice(0, 4)
  }

  const getImgUrl = (imgPath) => {
    return `https://image.tmdb.org/t/p/original${imgPath}`;
  };

  return (
    <div className={classes.hit}>
        {(state.currItem && state.isMovie) && <div>
            <Box fontSize={14} textAlign="left">{state.currItem.original_title}</Box>
            <div className={classes.rating}>
                <MovieIcon className={classes.icon}></MovieIcon>
                <Box fontSize={14}>{getReleaseYear(state.currItem.release_date)}</Box>
            </div>
            <div className={classes.rating}>
                <StarIcon className={classes.star}></StarIcon>
                <Box fontSize={14}>{state.currItem.vote_average}</Box>
            </div>
        </div>} 
        {(state.currItem && !state.isMovie) && <div className={classes.flex}>
            <img className={classes.image} src={getImgUrl(state.currItem.profile_path)} alt="" />
            <div className={classes.details}>   
                <Box fontSize={14} textAlign="left">{state.currItem.name}</Box>
                <div className={classes.rating}>
                    <PersonIcon className={classes.icon}></PersonIcon>
                    <Box fontSize={14}>{(state.currItem.known_for_department === "Acting") ? "Actor" : "Other"}</Box>
                </div>
            </div>
        </div>}
    </div>
  );
}

export default Search;
