const API_KEY = process.env.REACT_APP_API_KEY;
const DATA_URL = 'http://www.omdbapi.com/?apikey=' + API_KEY + '&';
// const POSTER_URL = 'http://www.img.omdbapi.com/?apikey=' + API_KEY + '&';

export const SEARCH_TITLE = (title: string) => DATA_URL + 's=' + title;
