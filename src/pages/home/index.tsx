import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import SearchBar from '../../components/searchbar';
import axios from 'axios';
import * as API from '../../constants/endpoints';

const HomePage: React.FC = () => {
  const [search, setSearch] = useState<string>('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedSearch = search.replaceAll(' ', '+');
    try {
      const { data: res } = await axios.get(API.SEARCH_TITLE(parsedSearch));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <SearchBar
        value={search}
        setValue={setSearch}
        handleSubmit={handleSearch}
      />
    </div>
  );
};

export default HomePage;
