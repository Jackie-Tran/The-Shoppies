import React, { useEffect, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../../components/nav-bar';
import axios from 'axios';
import * as API from '../../constants/endpoints';

type Movie = {
  Title: string;
  Year: string;
  imdbRating: string;
  Rated: string;
  Genre: string;
  Plot: string;
  Poster: string;
};

const MoviePage: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movie, setMovie] = useState<Movie>({
    Title: '',
    Year: '',
    imdbRating: '',
    Rated: '',
    Genre: '',
    Plot: '',
    Poster: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const { data: res } = await axios.get(API.GET_MOVIE(imdbID));
        setMovie(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [imdbID]);

  return (
    <Container>
      <Navbar />
      <MovieContainer>
        <Poster src={movie.Poster} />
        <MovieDetails>
          <MovieTitle>
            <Title>{movie.Title}</Title>
            <Year>({movie.Year})</Year>
          </MovieTitle>
          <p>{movie.Plot}</p>
        </MovieDetails>
      </MovieContainer>
      <NominateButton>Nominate</NominateButton>
    </Container>
  );
};

const Container = styled(Div100vh)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Poster = styled.img`
  width: 50%;
  height: 50%;
`;

const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const MovieTitle = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
`;
const Year = styled.h2`
  margin: 0;
  color: gray;
`;

const NominateButton = styled.button`
    -webkit-appearance: none;
    border-radius: 5px;
    border-width: 2px;
    border-color: #E56B6F;
    width: 50%;
    padding: 3%;
`;

export default MoviePage;
