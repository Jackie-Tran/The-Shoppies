import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

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
}

const MovieCard: React.FC<Props> = ({ title, year, poster, imdbID, setMovie, onClick }) => {

    const handleClick = () => {
        setMovie({ Title: title, Year: year, Poster: poster, imdbID });
        onClick();
    }

  return (
    <Container onClick={handleClick}>
        <Image src={ poster } />
        <Title>{ title }</Title>
        <Year>{ year }</Year>
    </Container>
  );
};

const Container = styled.div`
    width: 40%;
    height: 35vh;
    margin-bottom: 10%;
`;

const Image = styled.img`
    width: 100%;
    height: 80%;
`;

const Title = styled.p`
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
`;

const Year = styled.p`
    margin: 0;
    color: gray;
`;

export default MovieCard;
