import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import HitPreview from '../HitPreview/index'
import service from "../../Services/service";

const useStyles = makeStyles((theme) => ({
    searchBar: {
        position: `relative`,
        marginRight: 20
    },
    realTimeSearchRes: {
        position: `absolute`,
        width: 230,
        backgroundColor: `#524763`,
    }
}));

function Search() {
  const classes = useStyles();
  
  const [state, setState] = useState({
    searchTerm: '',
    searchHits: []
});

  useEffect(() => { 
      if (state.searchTerm.length > 0) {
          let delay = null;
          function delaySearch(term) {
              delay = setTimeout(() => {
                const actors = service.searchByKeyword('actors', term); //need to handle cases where nothing is found at all...
                const movies = service.searchByKeyword('movies', term); //need to handle cases where nothing is found at all...
                Promise.all([actors, movies])
                .then((results) => { // trying to move this out into service.js... so far unsuccessfully...
                    const actorArr = results[0].results.slice(0,2);
                    const movieArr = results[1].Search.slice(0,4);
                    let combinedSearchResults = [];
                    const getMovieDetails = async () => {
                        return Promise.all(movieArr.map(movie => service.getMovieFromOMDBByIMDBId(movie.imdbID)))
                    }
                    getMovieDetails()
                    .then(results => {
                        combinedSearchResults = actorArr.concat(results)
                        setState(state => ({ ...state, searchHits: combinedSearchResults }))
                    })
                });
              }, 1000)
          }
          delaySearch(state.searchTerm);
          return () => clearTimeout(delay)
      } else {
        setState((state) => ({ ...state, searchHits: [] }))
      }
  }, [state.searchTerm]);

const setSearchTerm = (term='') => {
    setState((state) => ({ ...state, searchTerm: term }));
}

  return (
    <div className={classes.searchBar}>
        <form>
            <input className="" placeholder="search all" type="text" value={state.searchTerm} onChange={(ev)=> setSearchTerm(ev.target.value)} />)
            <input type="submit" value="Submit" />
        </form>
        {state.searchHits.length > 0 && <div className={classes.realTimeSearchRes}>
            <div>{state.searchHits.map((hit, index) => (
                <div key={index} >
                    <HitPreview 
                    onClearSearch={setSearchTerm}
                    isMovie={(!hit.gender) ? true : false} 
                    movieInfo={(hit.imdbID) ? hit : {}} 
                    hitId={(hit.id) ? hit.id : {}}/>
                </div>
            ))}</div>
        </div>}
    </div>
  );
}

export default Search;