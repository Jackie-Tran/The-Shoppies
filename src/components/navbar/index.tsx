import React from 'react';
import styled from 'styled-components';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';

const Navbar: React.FC = () => {
    return(
        <Container>
            <AccountIcon />
            <Title>Shoppies</Title>
            <SearchBarIcon />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #3F424F;
    padding: 3%;
`;

const AccountIcon = styled(AccountCircleIcon)`
    font-size: 3rem;
    color: #BEE3DB;
`;

const Title = styled.h1`
    margin: 0;
    color: #FAF9F9;
    font-size: 2rem;
`;

const SearchBarIcon = styled(SearchIcon)`
    font-size: 3rem;
    color: #BEE3DB;
`;



export default Navbar;