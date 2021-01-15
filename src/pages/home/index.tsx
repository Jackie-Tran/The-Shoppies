import React, { useState } from 'react';
import styled from 'styled-components';
import Div100vh from 'react-div-100vh';
import Navbar from '../../components/nav-bar';
import SearchBar from '../../components/search-bar';
import axios from 'axios';
import * as API from '../../constants/endpoints';
import MovieCard from '../../components/movie-card';

const HomePage: React.FC = () => {
  const [search, setSearch] = useState<string>('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedSearch = search.replaceAll(' ', '+');
    try {
      const { data: res } = await axios.get(API.SEARCH_TITLE(parsedSearch));
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
          <MovieCard title='Toy Story' year='1995' imbdID='tt0114709' poster='https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg'/>
          <MovieCard title='Toy Story' year='1995' imbdID='tt0114709' poster='https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg'/>
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
