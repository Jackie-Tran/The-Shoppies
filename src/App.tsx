import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/home';
import MoviePage from './pages/movie';
import { Movie, NominationsContext } from './context/nominations-context';
import { Alert, AlertContext } from './context/alert-context';
import Snackbar from './components/snackbar';
require('dotenv').config();

function App() {
  const [nominations, setNominations] = useState<Movie[]>([]);
  const [alert, setAlert] = useState<Alert>({
    severity: 'information',
    message: 'default alert',
  });
  const [open, setOpen] = useState<boolean>(true);

  return (
    <NominationsContext.Provider value={{ nominations, setNominations }}>
      <AlertContext.Provider value={{ alert, setAlert, open, setOpen }}>
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
        <Snackbar />
      </AlertContext.Provider>
    </NominationsContext.Provider>
  );
}

export default App;
