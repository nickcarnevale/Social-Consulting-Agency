import React, { useState } from 'react';
import '../styles/SearchForm.css';

const SearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = event => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="search-form">
      <input
        type="text"
        placeholder="Search outcomes"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <button type="submit" className="search-button">SEARCH</button>
    </form>
  );
};

export default SearchForm;
