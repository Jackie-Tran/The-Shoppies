import React from 'react';
import styled from 'styled-components';

type Props = {
    title: string;
    year: string;
    poster: string;
    imbdID: string;
}

const MovieCard: React.FC<Props> = ({ title, year, poster, imbdID }) => {
  return (
    <Container>
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
