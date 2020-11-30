import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory} from 'react-router-dom';
import HitPreview from '../HitPreview/index'
import service from "../../Services/service";

const useStyles = makeStyles((theme) => ({
    searchBar: {
        position: `relative`
    },
    realTimeSearchRes: {
        position: `absolute`,
        width: 200,
        border: `2px solid blue`
    }
}));

function Search() {
  const classes = useStyles();
  const history = useHistory();
  
  const [state, setState] = useState({
    searchTerm: '',
    searchHits: []
});

  useEffect(() => {
      if (state.searchTerm.length > 0) {
          let delay = null;
          function delaySearch(term) {
              delay = setTimeout(() => {
                const actors = service.searchByKeyword('actors', term);
                const movies = service.searchByKeyword('movies', term);
                Promise.all([actors, movies])
                .then((results) => {
                    console.log('these are the RAW combined results: ', results)
                    const actorArr = results[0].results.slice(0,2);
                    const movieArr = results[1].results.slice(0,4);
                    const combinedSearchResults = actorArr.concat(movieArr);
                    console.log('these are the SHORTENED combined results: ', combinedSearchResults);
                    setState(state => ({ ...state, searchHits: combinedSearchResults }))
                });
                //   service.searchByKeyword(term)
                //   .then((result) => {
                //       console.log('these are the results', result.results);
                //       setState((state) => ({ ...state, searchHits: result.results }))
                // })
              }, 1500)
          }
          delaySearch(state.searchTerm);
          return () => clearTimeout(delay)
      } else {
        setState((state) => ({ ...state, searchHits: [] }))
      }
  }, [state.searchTerm]);

const setSearchTerm = (term) => {
    setState((state) => ({ ...state, searchTerm: term }));
}

  return (
    <div className={classes.searchBar}>
        <form>
            <input className="" placeholder="search all" type="text" onChange={(ev)=> setSearchTerm(ev.target.value)} />)
            <input type="submit" value="Submit" />
        </form>
        {state.searchHits.length > 0 && <div className={classes.realTimeSearchRes}>
            <ul>{state.searchHits.map((hit, index) => (
                <li key={index} >
                    <HitPreview isMovie={(!hit.gender) ? true : false} hitId={hit.id}/>
                </li>
            ))}</ul>
        </div>}
    </div>
  );
}

export default Search;