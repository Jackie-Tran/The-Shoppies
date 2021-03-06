import React from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { motion } from 'framer-motion';
import { device } from '../../constants/device';

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
            <SubmitButton type='submit'>
                <Icon fontSize='large' />
            </SubmitButton>
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
    padding: 1%;
    @media ${device.desktop} {
        flex: 20;
    }
`;

const SubmitButton = styled.button`
    flex: 1;
    padding: 1% 0;
    height: 100%;
    background: none;
`;

const Icon = styled(MdSearch)`
    color: white;
    font-size: 2rem;
`;

export default SearchBar;