import React, { useContext } from 'react';
import styled from 'styled-components';
import { IoCloseCircle } from 'react-icons/io5';
import { NominationsContext } from '../../context/nominations-context';

type Props = {
  title: string;
  year: string;
  imdbID: string;
};

const Nomination: React.FC<Props> = ({ title, year, imdbID }) => {
  const { removeNomination } = useContext(NominationsContext);

  return (
    <Container>
      <Text>
        {title} ({year})
      </Text>
      <DeleteIcon onClick={() => removeNomination(imdbID)} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-style: solid;
  border-width: 1px;
  border-color: gray;
  border-left: none;
  border-right: none;
  padding: 5%;
  width: 100%;
  box-sizing: border-box;
`;

const Text = styled.p`
  margin: 0;
  width: 90%;
`;

const DeleteIcon = styled(IoCloseCircle)`
  color: #3f424f;
  font-size: 1.5rem;
`;

export default Nomination;
