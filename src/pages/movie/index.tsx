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
            <Title>{movie.Title} ({movie.Year})</Title>
            <Genre>{ movie.Genre }</Genre>
            <Plot>{ movie.Plot }</Plot>
        </MovieDetails>
        <NominateButton>Nominate</NominateButton>
      </MovieContainer>
    </Container>
  );
};

const Container = styled(Div100vh)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
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
  text-align: center;
  padding: 5%;
`;

const Title = styled.h1`
  margin: 0;
`;

const Genre = styled.p`
    font-weight: 500;
`;

const Plot = styled.p`

`;

const NominateButton = styled.button`
    -webkit-appearance: none;
    border-radius: 5px;
    border: none;
    background-color: #04A777;
    color: white;
    font-size: 1rem;
    width: 50%;
    padding: 3%;
`;

export default MoviePage;
