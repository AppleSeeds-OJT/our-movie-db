import React, { useState, useEffect } from "react";
import { useHistory} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';
import TheatersIcon from '@material-ui/icons/Theaters';
import PersonIcon from '@material-ui/icons/Person';
import service from "../../Services/service";

const useStyles = makeStyles((theme) => ({
    hit: {
        cursor: `pointer`,
        border: `1px solid white`,
        color: `white`
    },
    flex: {
        display: `flex`,
    },
    image: {
        border: `1px solid white`,
        margin: 5,
        width: 50,
        height: 80
    },
    title: {
        width: 160,
        whiteSpace: `nowrap`,
        overflow: `hidden`,
        textOverflow: `ellipsis`
    },
    details: {
        display: `flex`,
        flexDirection: `column`,
        padding: 5
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
  const history = useHistory();

  const [state, setState] = useState({
    isMovie: null,  
    currItem: null
  });

  useEffect(() => {
    async function getHitInfo(isMovie, movieInfo, id) {
        setState((state) => ({ ...state, isMovie }));
        let gottenItem = {};
        if (isMovie) {
            setState((state) => ({ ...state, currItem: movieInfo }));
        } else if (!isMovie) {
            gottenItem = await service.getById('actor',id);
            if (!gottenItem) console.log('this actorItem could not be fetched: ', id);
            setState((state) => ({ ...state, currItem: gottenItem }));
        }
      }
      getHitInfo(props.isMovie, props.movieInfo, props.hitId);
  }, []);

  const getImgUrl = (imgPath) => {
    return `https://image.tmdb.org/t/p/original${imgPath}`;
  };

  const getProfession = (term) => { // may need to add more
    switch(term){
        case 'Acting':
            return 'Actor'
        case 'Directing':
            return 'Director'
        case 'Producing':
            return 'Producer'
        default:
            return 'other'
    }
  }

  const selectAndClearSearch = (what, id) => {
    props.onClearSearch();
    if (what === 'movie') {
        history.push(`/movie/${id}`)
    } else {
        history.push(`/actor/${id}`)
    }  
}

  return (
    <div className={classes.hit}>
        {(state.currItem && state.isMovie) && <div className={classes.flex} onClick={() => selectAndClearSearch('movie', state.currItem.imdbID)}>
            <img className={classes.image} src={state.currItem.Poster} alt="" />
            <div className={classes.details}>   
                <Box className={classes.title} fontSize={14} textAlign="left">{state.currItem.Title}</Box>
                <div className={classes.flex}>
                    <TheatersIcon className={classes.icon}></TheatersIcon>
                    <Box fontSize={14}>{state.currItem.Year}</Box>
                </div>
                <div className={classes.flex}>
                    <StarIcon className={classes.star}></StarIcon>
                    <Box fontSize={14}>{state.currItem.imdbRating}</Box>
                </div>
            </div>
        </div>} 
        {(state.currItem && !state.isMovie) && <div className={classes.flex} onClick={() => selectAndClearSearch('actor', state.currItem.id)}>
            <img className={classes.image} src={getImgUrl(state.currItem.profile_path)} alt="" />
            <div className={classes.details}>   
                <Box fontSize={14} textAlign="left">{state.currItem.name}</Box>
                <div className={classes.flex}>
                    <PersonIcon className={classes.icon}></PersonIcon>
                    <Box fontSize={14}>{getProfession(state.currItem.known_for_department)}</Box>
                </div>
            </div>
        </div>}
    </div>
  );
}

export default Search;
