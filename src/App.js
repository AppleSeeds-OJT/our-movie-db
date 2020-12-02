import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/index";
import Home from "./Pages/Home/index"
import MovieDetails from './Pages/MovieDetails/index'
import FavoriteMovies from './Pages/FavoriteMovies/index'
import ActorDetails from './Pages/ActorDetails/index'
import storageService from "./Services/storageService";
import "./App.css";

function App() {
  const [state, setState] = useState({
    favoriteMovies: null,
  });
  
  useEffect(() => {
    const favMovies = storageService.loadFromLocalStorage('favoriteMovies');
      if(favMovies) {
        setState((state) => ({...state, favoriteMovies: favMovies }));
      }
  }, []);

  const toggleIsFavorite = (movieId) => {
    storageService.saveToLocalStorage(movieId)
    console.log('now going to reload the favMovies...');
    reloadFavMovies()
  }

  const reloadFavMovies = () => {
    const favMovies = storageService.loadFromLocalStorage('favoriteMovies');
    setState((state) => ({...state, favoriteMovies: favMovies }));
  }

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => (<Home />)} />
        <Route exact path="/favmovies/" render={() => (<FavoriteMovies onToggleIsFavorite={toggleIsFavorite} favMovies={state.favoriteMovies} />)} />
        <Route exact path="/movie/:id" render={() => (<MovieDetails onToggleIsFavorite={toggleIsFavorite} favMovies={state.favoriteMovies} />)} />
        <Route exact path="/actor/:id" render={() => (<ActorDetails />)} />
      </Switch>
    </div>
  );
}

export default App;
