import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import service from "../../Services/service";

const useStyles = makeStyles((theme) => ({}));

function Search(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    isMovie: null,  
    currItem: null
  });

  useEffect(() => {
    async function getHitInfo(isMovie, id) {
        setState((state) => ({ ...state, isMovie }));
        if (isMovie) {
            const gottenItem = await service.getById('movie',id)
            console.log('this is the gottenItem: ', gottenItem);
        } else if (!isMovie) {
            const gottenItem = await service.getById('actor',id)
            console.log('this is the gottenItem: ', gottenItem);
        }
        // TODO: Handle case where "gottenItem" is undefined (because of 404 on TMDB on that specific ID...)
        // setState((state) => ({ ...state, currItem: gottenItem }));
      }
      getHitInfo(props.isMovie, props.hitId);
  }, []);

  return (
    <div className="">
      item_{props.hitId}
    </div>
  );
}

export default Search;
