import { useEffect, useState } from 'react';
import { getAllOutcomes } from '../api';
import { deleteOutcome, addOutcome } from './OutcomeUtils';

export default function useOutcomes() {
  const [outcomes, setOutcomes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchOutcomes();
  }, []);

  const fetchOutcomes = () => {
    getAllOutcomes().then(setOutcomes);
  };

  const handleAddOutcome = (outcome) => {
    addOutcome(outcome)
      .then(data => {
        setOutcomes(prevOutcomes => [...prevOutcomes, data]);
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDeleteOutcome = (id) => {
    deleteOutcome(id)
      .then(() => {
        setOutcomes(outcomes.filter(outcome => outcome.id !== id));
        setSearchResults(searchResults.filter(outcome => outcome.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting outcome:', error);
      });
  };

  const handleSearch = term => {
    const results = outcomes.filter(outcome =>
      outcome.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  return { outcomes, searchResults, handleAddOutcome, handleDeleteOutcome, handleSearch };
};
