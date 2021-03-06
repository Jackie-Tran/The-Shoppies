const API_KEY = process.env.REACT_APP_API_KEY;
const DATA_URL = 'https://www.omdbapi.com/?apikey=' + API_KEY + '&';
// const POSTER_URL = 'http://www.img.omdbapi.com/?apikey=' + API_KEY + '&';

export const SEARCH_TITLE = (title: string, page: number) => DATA_URL + 's=' + title + '&page=' + page;
export const GET_MOVIE = (imdbID: string) => DATA_URL + 'i=' + imdbID;
