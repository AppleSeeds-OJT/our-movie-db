import { Switch, Route } from "react-router-dom";
import MovieDetails from './Pages/MovieDetails/index'
import "./App.css";

import Home from "./Pages/Home/index"


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (<Home />)} />
        <Route exact path="/movie/:id" render={() => (<MovieDetails />)} />
      </Switch>
    </div>
  );
}

export default App;
