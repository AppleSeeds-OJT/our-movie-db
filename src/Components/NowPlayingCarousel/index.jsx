import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory} from 'react-router-dom'
import {Box, Button} from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import StarIcon from '@material-ui/icons/Star';
import service from "../../Services/service";

const useStyles = makeStyles((theme) => ({
    carousel: {
        margin: `0 auto`,
        width: `70%`
    },
    movieInfo: {
        display: `flex`,
        flexDirection: `column`,
        alignItems: `flex-start`
    },
    details: {
        width: `25%`,
        marginTop: `20px`,
        display: `flex`,
        justifyContent: `space-between`
    },
    detailsBtn: {
        '&:hover': {
          color: `black`,
          backgroundColor: `aqua`,
          transform: `translateY(-2px)`
        }
    },
    rating: {
        display: `flex`,
        alignItems: `center`,
        justifyContent: `space-between`
    },
    star: {
        marginRight: 10,
        color: `yellow`
    }
  }));

function NowPlayingCarousel() {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState({
    carouselMovies: [],
  });

  useEffect(() => {
    async function getMovies(moviesToShow) {
      const gottenMovies = await service.query(moviesToShow);
      const fiveRandomMovies = service.getFiveRandomMovies(gottenMovies.results);
      setState((state) => ({ ...state, carouselMovies: fiveRandomMovies }));
    }
    getMovies("latest");
  }, []);

  const getImgUrl = (backdropPath) => {
    return `https://image.tmdb.org/t/p/original${backdropPath}`;
  };

  const getReleaseYear = (releaseDate) => {
    return releaseDate.slice(0, 4)
  }

  return (
    <div className={classes.carousel}>
      <Carousel infiniteLoop showStatus={false} showThumbs={false} showIndicators={false}>
            {state.carouselMovies.length > 0 && state.carouselMovies.map((movie, index) => (
                <div key={index} >
                    <img src={getImgUrl(movie.backdrop_path)} alt="" />
                    <div className="legend">
                        <div className={classes.movieInfo}>
                            <Box lineHeight={2} fontSize={16} fontWeight="fontWeightBold">{movie.original_title}</Box>
                            <Box textAlign="left">{movie.overview}</Box>
                            <div className={classes.details}>
                                <Button className={classes.detailsBtn} variant="contained" color="primary" onClick={() => history.push(`/movie/${movie.id}`)}>Details</Button>
                                <div className={classes.movieInfo}>
                                    <Box>{getReleaseYear(movie.release_date)}</Box>
                                    <Box>runtime...</Box>
                                </div>
                                <div className={classes.rating}>
                                    <StarIcon className={classes.star}></StarIcon>
                                    {movie.vote_average}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
      </Carousel>
    </div>
  );
}

export default NowPlayingCarousel;