import React, { useState } from 'react';
import styled from 'styled-components';
import Div100vh from 'react-div-100vh';
import Navbar from '../../components/nav-bar';
import SearchBar from '../../components/search-bar';
import axios from 'axios';
import * as API from '../../constants/endpoints';
import MovieCard from '../../components/movie-card';

type Movie = {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
}

const HomePage: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<Movie[]>();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedSearch = search.replaceAll(' ', '+');
    try {
      const { data: { Search: res } } = await axios.get(API.SEARCH_TITLE(parsedSearch));
      setData(res);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Navbar />
      <SearchBar
        value={search}
        setValue={setSearch}
        handleSubmit={handleSearch}
      />
      <ResultsContainer>
          {
              data?.map((movie: Movie) => {
                return (<MovieCard key={movie.imdbID} imbdID={movie.imdbID} title={movie.Title} year={movie.Year} poster={movie.Poster}/>)
              })
          }
      </ResultsContainer>
    </Container>
  );
};

const Container = styled(Div100vh)`
    display: flex;
    flex-direction: column;
`;

const ResultsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin-top: 5%;
`;

export default HomePage;
