import { Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/index";
import MovieDetails from './Pages/MovieDetails/index'
import ActorDetails from './Pages/ActorDetails/index'
import "./App.css";

import Home from "./Pages/Home/index"


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => (<Home />)} />
        <Route exact path="/movie/:id" render={() => (<MovieDetails />)} />
        <Route exact path="/actor/:id" render={() => (<ActorDetails />)} />
      </Switch>
    </div>
  );
}

export default App;
