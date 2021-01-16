import React from 'react';
import styled from 'styled-components';
import { device } from '../../constants/device';

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
};

type Props = {
  title: string;
  year: string;
  poster: string;
  imdbID: string;
  setMovie: React.Dispatch<React.SetStateAction<Movie>>;
  onClick: () => void;
};

const MovieCard: React.FC<Props> = ({
  title,
  year,
  poster,
  imdbID,
  setMovie,
  onClick,
}) => {
  const handleClick = () => {
    setMovie({ Title: title, Year: year, Poster: poster, imdbID });
    onClick();
  };

  return (
    <Container onClick={handleClick}>
      <Image src={poster} />
      <Title>{title}</Title>
      <Year>{year}</Year>
    </Container>
  );
};

const Container = styled.div`
  width: 10rem;
  height: 18rem;
  margin-bottom: 10%;
  @media ${device.desktop} {
    width: 15rem;
    height: 25rem;
    margin-bottom: 5%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 80%;
`;

const Title = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  @media ${device.desktop} {
      font-size: 1.5rem;
  }
`;

const Year = styled.p`
  margin: 0;
  color: gray;
  @media ${device.desktop} {
      font-size: 1.2rem;
  }
`;

export default MovieCard;
