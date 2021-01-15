import React from 'react';
import Navbar from '../../components/navbar';
import SearchBar from '../../components/searchbar';

const HomePage: React.FC = () => {
    return(
        <div>
            <Navbar />
            <SearchBar />
        </div>
    )
}

export default HomePage;