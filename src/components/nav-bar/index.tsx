import React from 'react';
import styled from 'styled-components';
import StarIcon from '@material-ui/icons/Star';

const Navbar: React.FC = () => {
  return (
    <Container>
      <Title>Shoppies</Title>
      <Star />
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3f424f;
  padding: 3% 0;
  margin-bottom: 1000px;
`;

const Title = styled.h1`
  margin: 0;
  color: #faf9f9;
  font-size: 2rem;
`;

const Star = styled(StarIcon)`
  color: white;
  margin-right: 3%;
  position: absolute;
  right: 0;
`;

export default Navbar;
