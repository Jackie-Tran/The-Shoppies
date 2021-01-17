import React, { useContext } from 'react';
import styled from 'styled-components';
import CancelIcon from '@material-ui/icons/Cancel';
import { NominationsContext } from '../../context/nominations-context';

type Props = {
    title: string;
    year: string;
    imdbID: string;
}

const Nomination: React.FC<Props> = ({ title, year, imdbID }) => {
    const { removeNomination } = useContext(NominationsContext);

    return (
        <Container>
            <Text>{title} ({year})</Text>
            <CancelIcon onClick={() => removeNomination(imdbID)}/>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
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
`;

export default Nomination;