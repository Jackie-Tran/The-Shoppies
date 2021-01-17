import React, { useContext, useEffect, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../../components/nav-bar';
import axios from 'axios';
import * as API from '../../constants/endpoints';
import { Movie, NominationsContext } from '../../context/nominations-context';
import { device } from '../../constants/device';

type MovieDetails = {
  imdbRating: string;
  Rated: string;
  Genre: string;
  Plot: string;
};

const MoviePage: React.FC = () => {
  const { nominations, addNomination, removeNomination } = useContext(NominationsContext);
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movie, setMovie] = useState<Movie & MovieDetails>({
    Title: '',
    Year: '',
    imdbID,
    Poster: '',
    imdbRating: '',
    Rated: '',
    Genre: '',
    Plot: '',
  });
  const [isNominated, setIsNominated] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        // Get the movie
        const { data: res } = await axios.get(API.GET_MOVIE(imdbID));
        const { Title, Year, Poster, imdbRating, Rated, Genre, Plot } = res;
        setMovie({
          Title,
          Year,
          imdbID,
          Poster,
          imdbRating,
          Rated,
          Genre,
          Plot,
        });
        // Check if movie is already nominated
        for (let i = 0; i < nominations.length; i++) {
          if (nominations[i].imdbID === imdbID) {
            setIsNominated(true);
            return;
          }
        }
      } catch (err) {
        console.log(err);
      }
      setIsNominated(false);
    })();
  }, [imdbID, nominations]);

  const handleAddNomination = async () => {
    const { Title, Year, imdbID, Poster } = movie;
    const basicMovie = { Title, Year, imdbID, Poster };
    addNomination(basicMovie);
    setIsNominated(true);
  };

  const handleRemoveNomination = async () => {
    removeNomination(imdbID);
    setIsNominated(false);
  };

  return (
    <Container>
      <Navbar />
      <MovieContainer>
        <Poster src={movie.Poster} />
        <Details>
          <Title>
            {movie.Title} ({movie.Year})
          </Title>
          <Genre>{movie.Genre}</Genre>
          <Plot>{movie.Plot}</Plot>
        </Details>
        <NominateButton
          isNominated={isNominated}
          onClick={() => {
            isNominated ? handleRemoveNomination() : handleAddNomination();
          }}
        >
          {isNominated ? 'Remove Nomination' : 'Nominate'}
        </NominateButton>
      </MovieContainer>
    </Container>
  );
};

const Container = styled(Div100vh)`
  display: flex;
  flex-direction: column;
`;

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10%;
  box-sizing: border-box;
  @media ${device.desktop} {
    padding: 3%;
  }
`;

const Poster = styled.img`
  width: 13rem;
  @media ${device.desktop} {
    width: 16rem;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 5%;
  @media ${device.desktop} {
    padding: 1%;
  }
`;

const Title = styled.h1`
  margin: 0;
`;

const Genre = styled.p`
  font-weight: 500;
  @media ${device.desktop} {
    font-size: 1.2rem;
  }
`;

const Plot = styled.p``;

const NominateButton = styled.button<{ isNominated: boolean }>`
  -webkit-appearance: none;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => (props.isNominated ? '#f07167' : '#04a777')};
  color: white;
  font-size: 1rem;
  width: 50%;
  padding: 3%;
  @media ${device.desktop} {
      width: 20%;
      padding: 1%;
  }
`;

export default MoviePage;
