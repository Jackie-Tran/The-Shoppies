import { createContext } from 'react';

export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
};

export type NominationsContextType = {
    nominations: Movie[];
    addNomination: (movie: Movie) => void;
    removeNomination: (imdbID: string) => void;
}

export const NominationsContext = createContext<NominationsContextType>({
    nominations: [],
    addNomination: () => { console.warn('no nominations provider') },
    removeNomination: () => { console.warn('no nominations provider') },
});