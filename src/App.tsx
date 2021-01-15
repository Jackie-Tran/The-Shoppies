import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/home';
import MoviePage from './pages/movie';
require('dotenv').config();

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movie/:imdbID">
          <MoviePage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
