import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/nav-bar';
import SearchBar from '../../components/search-bar';
import axios from 'axios';
import { Movie } from '../../context/nominations-context';
import * as API from '../../constants/endpoints';
import MovieCard from '../../components/movie-card';
import MovieModal from '../../components/movie-modal';
import { device } from '../../constants/device';
import { AlertContext } from '../../context/alert-context';

const HomePage: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<Movie[]>();
  const [movie, setMovie] = useState<Movie>({
    Title: '',
    Year: '',
    imdbID: '',
    Poster: '',
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLoadButton, setShowLoadButton] = useState<boolean>(false);
  const { setAlert, setShowAlert } = useContext(AlertContext); 

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedSearch = search.trim().replaceAll(' ', '+');
    try {
      const {
        data: { Search: res },
      } = await axios.get(API.SEARCH_TITLE(parsedSearch, 1));
      setData(res);
      setPage(1);
      setShowLoadButton(true);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoadMore = async () => {
      const parsedSearch = search.trim().replaceAll(' ', '+');
    try {
        const { data: res } = await axios.get(API.SEARCH_TITLE(parsedSearch, page + 1));
        // Check if there are no more pages
        if (res.Response === 'False') {
            setAlert({ severity: 'warning', message: 'No more results available.'});
            setShowAlert(true);
            setShowLoadButton(false);
            return;
        }
        // Concat the new results to the current data
        setData(data?.concat(res.Search));
        setPage(page + 1);
        console.log(res);
    } catch (err) {
        console.log(err);
    }
  }

  return (
    <Container>
      <Navbar />
      <SearchBar
        value={search}
        setValue={setSearch}
        handleSubmit={handleSearch}
      />
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
      {
          showLoadButton && (
            <LoadButton onClick={handleLoadMore}>Load More</LoadButton>
          )
      }
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 5%;
`;

const ResultsContainer = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  justify-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 5%;
  @media ${device.desktop} {
    padding-top: 3%;
    grid-template-columns: repeat(4, 1fr);
  }
`;

const LoadButton = styled.button`
  -webkit-appearance: none;
  border-radius: 5px;
  border: none;
  align-self: center;
  background-color:#555b6e;
  color: white;
  font-size: 1rem;
  width: 50%;
  padding: 3%;
  @media ${device.desktop} {
    width: 20%;
    padding: 1%;
  }
`;

export default HomePage;
