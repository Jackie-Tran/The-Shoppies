import React, { useState } from 'react';
import styled from 'styled-components';
import Div100vh from 'react-div-100vh';
import Navbar from '../../components/nav-bar';
import SearchBar from '../../components/search-bar';
import axios from 'axios';
import { Movie } from '../../context/nominations-context';
import * as API from '../../constants/endpoints';
import MovieCard from '../../components/movie-card';
import MovieModal from '../../components/movie-modal';

const HomePage: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<Movie[]>();
  const [movie, setMovie] = useState<Movie>({
    Title: '',
    Year: '',
    imdbID: '',
    Poster: '',
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedSearch = search.replaceAll(' ', '+');
    try {
      const {
        data: { Search: res },
      } = await axios.get(API.SEARCH_TITLE(parsedSearch));
      setData(res);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Header>
        <Navbar />
        <SearchBar
          value={search}
          setValue={setSearch}
          handleSubmit={handleSearch}
        />
      </Header>
      <ResultsContainer>
        {data?.map((movie: Movie) => {
          return (
            <MovieCard
              key={movie.imdbID}
              imdbID={movie.imdbID}
              title={movie.Title}
              year={movie.Year}
              poster={movie.Poster}
              setMovie={setMovie}
              onClick={() => setShowModal(true)}
            />
          );
        })}
      </ResultsContainer>
      <MovieModal
        isShowing={showModal}
        setIsShowing={setShowModal}
        title={movie.Title}
        year={movie.Year}
        imdbID={movie.imdbID}
        poster={movie.Poster}
      />
    </Container>
  );
};

const Container = styled(Div100vh)`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`

`;

const ResultsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-top: 5%;
`;

export default HomePage;
