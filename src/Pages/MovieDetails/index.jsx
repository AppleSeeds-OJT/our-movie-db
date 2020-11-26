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
