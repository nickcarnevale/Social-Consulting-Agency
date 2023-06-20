import { useEffect, useState } from 'react';
import { sortBy } from 'lodash';
import Papa from 'papaparse';
import { getAllOutcomes } from '../api';
import { deleteOutcome, addOutcome , updateOutcome} from './OutcomeUtils';

export default function useOutcomes() {
  const [outcomes, setOutcomes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredOutcomes, setFilteredOutcomes] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    fetchOutcomes();
  }, [refetch]);

  const fetchOutcomes = async () => {
    const allOutcomes = await getAllOutcomes();
    setOutcomes(allOutcomes);
    setFilteredOutcomes(allOutcomes);
  };

  const handleAddOutcome = (outcome) => {
    addOutcome(outcome)
      .then(data => {
        setOutcomes(prevOutcomes => [...prevOutcomes, data]);
        setRefetch(prev => !prev); // add this line
      })
      .catch(error => console.error('Error:', error));
  };

  const handleUpdateOutcome = async (id, data) => {
    await updateOutcome(id, data);
    setOutcomes(outcomes.map(outcome => outcome.id === id ? { ...outcome, ...data } : outcome));
  };

  const handleDeleteOutcome = (id) => {
    deleteOutcome(id)
      .then(() => {
        setRefetch(prev => !prev); // add this line
      })
      .catch((error) => {
        console.error('Error deleting outcome:', error);
      });
  };

  const handleSearch = term => {
    const results = outcomes.filter(outcome =>
      outcome.name.toLowerCase().includes(term.toLowerCase()) ||
      outcome.nombreespanol?.toLowerCase()?.includes(term.toLowerCase()) ||
      outcome.stakeholder?.toLowerCase()?.includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  const refreshOutcomes = () => setRefetch(prev => !prev);

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
      outcome.name.toLowerCase().includes(term.toLowerCase()) ||
      outcome.nombreespanol?.toLowerCase()?.includes(term.toLowerCase()) ||
      outcome.stakeholder?.toLowerCase()?.includes(term.toLowerCase())
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

  return { outcomes, filteredOutcomes, searchResults, handleAddOutcome, handleUpdateOutcome, handleDeleteOutcome, handleSearch, handleOutcomeSearch, handleFilterChange, handleExport, refreshOutcomes};
};
