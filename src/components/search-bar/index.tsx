import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import { motion } from 'framer-motion';

type Props = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBar: React.FC<Props> = ({ value, setValue, handleSubmit }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value);
    }

    

    return (
        
        <Container onSubmit={handleSubmit}>
            <Input type='text' name='movie-title' placeholder='Search a movie here...' value={value} onChange={handleChange} />
            <Icon fontSize='large' />
        </Container>
    )
}

const Container = styled(motion.form)`
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