import React from 'react';
import styled from 'styled-components';

const MovieCard: React.FC = () => {
  return (
    <Container>
        <Image src={'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg'} />
    </Container>
  );
};

const Container = styled.div`
    width: 40vw;
    height: 30vh;
    border-style: solid;
    border-width: 1px;
    border-color: black;
    margin-bottom: 5%;
`;

const Image = styled.img`
    max-width: 100%;
    height: 100%;
`;

export default MovieCard;
