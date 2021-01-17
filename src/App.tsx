import React, { useEffect, useState } from 'react';
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
  const [showAlert, setShowAlert] = useState<boolean>(true);

  useEffect(() => {
    // Check if there are already nominations
    const storedNominations = localStorage.getItem('nominations');
    if (storedNominations) {
      setNominations(JSON.parse(storedNominations));
    }
  }, []);

  const addNomination = async (movie: Movie) => {
      // Check if there are already 5 nominations
      if (nominations.length === 5) {
          setAlert({ severity: 'error', message: 'You already made 5 nominations' });
          setShowAlert(true);
          return;
      }
      // Set new nominations
      const newNominations = nominations.concat(movie);
      setNominations(newNominations);
      localStorage.setItem('nominations', JSON.stringify(newNominations));
      // Set Alert
      setAlert({ severity: 'success', message: 'Successfully made nominations.' });
      setShowAlert(true);
      return;
  }

  const removeNomination = async (imdbID: string) => {
      const newNominations = (nominations.filter((movie) => movie.imdbID !== imdbID));
      setNominations(newNominations);
      localStorage.setItem('nominations', JSON.stringify(newNominations));
      // Set Alert
      setAlert({ severity: 'success', message: 'Successfully removed nomination.' });
      setShowAlert(true);
      return;
  }

  return (
    <NominationsContext.Provider value={{ nominations, addNomination, removeNomination }}>
      <AlertContext.Provider value={{ alert, setAlert, showAlert, setShowAlert }}>
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
        <Snackbar autoHideDuration={10000} />
      </AlertContext.Provider>
    </NominationsContext.Provider>
  );
}

export default App;
