import React, { useState, useEffect } from "react";
import { useParams} from 'react-router-dom'
import service from "../../Services/service";

function MovieDetails() {
  const { id } = useParams();
  console.log(id); // why is this happening twice !?!?
  const [state, setState] = useState({
    currMovie: null,
  });

  useEffect(() => {
    async function getMovieById(tmdbMovieId) {
      const gottenMovie = await service.getMovieById(tmdbMovieId);
      setState((state) => ({...state, currMovie: gottenMovie }));
    } 
    getMovieById(id);
  }, [id]);

  //TODO:
  // add "available to watch on:" by using https://api.themoviedb.org/3/movie/581392/watch/providers?api_key=e5a2122bd03016f587131ffe3ecc2596
  // add reviews by using: https://api.themoviedb.org/3/movie/581392/reviews?api_key=e5a2122bd03016f587131ffe3ecc2596&language=en-US&page=1
  
  return (
    <div>
      {state.currMovie && <div>
        These are the details!
        <div>moviename: {state.currMovie.original_title}</div>
        <div>runtime: {state.currMovie.runtime} mins</div>
      </div>}
    </div>
  );
}

export default MovieDetails;
