import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar: React.FC = () => {
    return (
        <Container>
            <Input type='text' name='movie-title' placeholder='Search a movie here...'/>
            <Icon fontSize='large' />
        </Container>
    )
}

const Container = styled.div`
    background-color: #555b6e;
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    flex: 6;
    border-radius: 0;
    font-size: 1.5rem;
`;

const Icon = styled(SearchIcon)`
    flex: 1;
    color: white;

`;

export default SearchBar;