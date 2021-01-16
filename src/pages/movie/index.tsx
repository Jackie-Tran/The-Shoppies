import React, { useContext, useEffect, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../../components/nav-bar';
import axios from 'axios';
import * as API from '../../constants/endpoints';
import { Movie, NominationsContext } from '../../context/nominations-context';

// type Movie = {
//   Title: string;
//   Year: string;
//   imdbRating: string;
//   Rated: string;
//   Genre: string;
//   Plot: string;
//   Poster: string;
// };


type MovieDetails = {
  imdbRating: string;
  Rated: string;
  Genre: string;
  Plot: string;
}

const MoviePage: React.FC = () => {
  const { nominations, setNominations } = useContext(NominationsContext);
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
        setMovie({ Title, Year, imdbID, Poster, imdbRating, Rated, Genre, Plot });
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
  
  const addNomination = () => {
    // Check if there are already 5 nominations
    if (nominations.length === 5) return;
    const { Title, Year, imdbID, Poster } = movie;
    setNominations(nominations.concat({ Title, Year, imdbID, Poster }));
    setIsNominated(true);
  };

  const removeNomination = () => {
    setNominations(nominations.filter((movie) => movie.imdbID !== imdbID));
    setIsNominated(false);
  }

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
        <NominateButton isNominated={isNominated} onClick={() => {isNominated ? removeNomination() : addNomination()}}>{isNominated ? 'Remove Nomination' : 'Nominate'}</NominateButton>
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

const Details = styled.div`
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
`;

export default MoviePage;
