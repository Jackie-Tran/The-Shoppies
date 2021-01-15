import { createContext } from 'react';

export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
};

export type NominationsContextType = {
    nominations: Movie[];
    setNominations: React.Dispatch<React.SetStateAction<Movie[]>>;
}

export const NominationsContext = createContext<NominationsContextType>({
    nominations: [],
    setNominations: () => { console.warn('no nominations provider') }
});