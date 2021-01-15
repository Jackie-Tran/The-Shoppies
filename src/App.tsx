import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/home';
import MoviePage from './pages/movie';
import { Movie, NominationsContext } from './context/nominations-context';
require('dotenv').config();

function App() {
  const [nominations, setNominations] = useState<Movie[]>([]);

  return (
    <NominationsContext.Provider value={{ nominations, setNominations }}>
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
    </NominationsContext.Provider>
  );
}

export default App;
