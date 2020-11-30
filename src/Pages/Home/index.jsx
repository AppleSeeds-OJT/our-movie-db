import React, { useState, useEffect } from "react";
import { Box } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../../Components/Navbar/index";
import MovieCard from "../../Components/MovieCard/index";
import NowPlayingCarousel from "../../Components/NowPlayingCarousel/index";
import service from "../../Services/service";

const useStyles = makeStyles((theme) => ({
  intro: {
    marginBottom: 20,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`
  },
  title: {
    color: `white`,
    marginTop: 20
  },
  subtitle: {
    color: `aqua`
  },
  cardContainer: {
    padding: 20,
    display: `grid`,
    gridTemplateColumns: `repeat(auto-fill, minmax(180px, 1fr))`,
    gridAutoRows: `auto`,
    gridGap: `1rem`,
  },
  queryType: {
    width: `25%`,
    display: `flex`,
    justifyContent: `space-between`,
    margin: `20px 0`
  },
  queryBtn: {
    cursor: `pointer`,
    color: `white`,
    border: `1px solid aqua`,
    padding: `5px 10px`,
    transition: `all .3s`,
    '&:hover': {
      color: `black`,
      backgroundColor: `aqua`,
      transition: `all .3s`
    }
  }
}));

function Home() {
  const classes = useStyles();
  const [state, setState] = useState({
    movies: [],
    moviesToShow: 'popular'
  });

  useEffect(() => {
    async function getMovies(moviesToShow) {
      const gottenMovies = await service.query(moviesToShow)
      setState((state) => ({ ...state, movies: gottenMovies.results }));
    }
    getMovies(state.moviesToShow);
  }, [state.moviesToShow]);

  const moviesToShow = (param) => {
    setState((state) => ({ ...state, moviesToShow: param }));
  }

  const getReleaseYear = (releaseDate) => {
    return releaseDate.slice(0, 4)
  }

  return (
    <div>
      <Navbar />
      <NowPlayingCarousel />
      <div>
        <div className={classes.intro}>
          <Box className={classes.title} fontSize="h4.fontSize" fontWeight="fontWeightBold">Welcome to Our Movie Database</Box>
          <Box className={classes.subtitle} fontSize="h5.fontSize" fontWeight="fontWeightMedium">Discover and Watch</Box>
          <div className={classes.queryType}>
            <div className={classes.queryBtn} onClick={() => { moviesToShow('popular') }} style={ state.moviesToShow === 'popular' ? {backgroundColor:'aqua', color: 'black'} : {}}>Popular</div>
            <div className={classes.queryBtn} onClick={() => { moviesToShow('trending') }} style={ state.moviesToShow === 'trending' ? {backgroundColor:'aqua', color: 'black'} : {}}>Trending</div>
            <div className={classes.queryBtn} onClick={() => { moviesToShow('latest') }} style={ state.moviesToShow === 'latest' ? {backgroundColor:'aqua', color: 'black'} : {}}>Latest</div>
          </div>
        </div>
        <div className={classes.cardContainer}>
          {state.movies.map((movie, index) => (
            <MovieCard key={index} movieId={movie.id} movieReleaseYear={getReleaseYear(movie.release_date)} movieRating={movie.vote_average} movieName={movie.original_title} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

