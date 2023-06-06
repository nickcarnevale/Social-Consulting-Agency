import { useState, useEffect } from 'react';
import { sortBy } from 'lodash';
import Papa from 'papaparse';
import { getAllOutcomes } from '../api';

export default function useOutcomeFilter() {
  const [outcomes, setOutcomes] = useState([]);
  const [filteredOutcomes, setFilteredOutcomes] = useState([]);
  const [refetch, setRefetch] = useState(false); // add this line

  
  useEffect(() => {
    fetchOutcomes();
  }, [refetch]);

  const fetchOutcomes = async () => {
    const allOutcomes = await getAllOutcomes();
    setOutcomes(allOutcomes);
    setFilteredOutcomes(allOutcomes); // initially set filteredOutcomes to outcomes
  };

  const refreshOutcomes = () => setRefetch(prev => !prev); // toggle refetch value

  const handleAlphabeticalFilter = () => {
    const sortedOutcomes = sortBy(outcomes, 'name');
    setFilteredOutcomes(sortedOutcomes);
  };

  const handleIdFilter = () => {
    const sortedOutcomes = sortBy(outcomes, 'id');
    setFilteredOutcomes(sortedOutcomes);
  };

  const handleOutcomeSearch = term => {
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
        handleOutcomeSearch(filterType);
        break;
    }
  };

  const handleExport = () => {
    const csv = Papa.unparse(filteredOutcomes);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'outcomes.csv';
    link.href = url;
    link.click();
  };

  return { outcomes, filteredOutcomes, handleOutcomeSearch, handleFilterChange, handleExport, refreshOutcomes};
};
