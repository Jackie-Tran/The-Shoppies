import { createContext } from 'react';

export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
};

export type NominationsContextType = {
    movies: Movie[];
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

export const NominationContext = createContext<NominationsContextType>({
    movies: [],
    setMovies: () => { console.warn('no nominations provider') }
});