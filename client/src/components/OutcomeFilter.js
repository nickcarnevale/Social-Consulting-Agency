import { useState, useEffect } from 'react';
import { sortBy } from 'lodash';
import { getAllOutcomes } from '../api';

export default function useOutcomeFilter() {
  const [outcomes, setOutcomes] = useState([]);
  const [filteredOutcomes, setFilteredOutcomes] = useState([]);

  useEffect(() => {
    fetchOutcomes();
  }, []);

  const fetchOutcomes = async () => {
    const allOutcomes = await getAllOutcomes();
    setOutcomes(allOutcomes);
    setFilteredOutcomes(allOutcomes); // initially set filteredOutcomes to outcomes
  };

  const handleAlphabeticalFilter = () => {
    const sortedOutcomes = sortBy(outcomes, 'name');
    setFilteredOutcomes(sortedOutcomes);
  };

  const handleIdFilter = () => {
    const sortedOutcomes = sortBy(outcomes, 'id');
    setFilteredOutcomes(sortedOutcomes);
  };

  const handleSearch = term => {
    const results = outcomes.filter(outcome =>
      outcome.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOutcomes(results);
  };

  const handleFilterChange = (filterType) => {
    switch (filterType) {
      case "alphabetical":
        handleAlphabeticalFilter();
        break;
      case "id":
        handleIdFilter();
        break;
      default:
        handleSearch(filterType);
        break;
    }
  };

  return { outcomes, filteredOutcomes, handleFilterChange };
};
