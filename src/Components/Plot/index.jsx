import React, { useState, useEffect } from "react";
import service from "../../Services/service";

function Plot(props) {
  const [state, setState] = useState({
    plot: null
  });

  useEffect(() => {
    service.getExternalId(props.movieId)
      .then((res) => service.getById(res.imdb_id))
      .then((result) => setState((state) => ({ ...state, plot: result.Plot })));
  }, []);

  return (
    <div>{state.plot}</div>
  );
}

export default Plot;