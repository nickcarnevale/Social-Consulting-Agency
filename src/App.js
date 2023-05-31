import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import useOutcomes from './components/UseOutcomes';
import AddOutcomeForm from './components/AddOutcomeForm';
import SearchForm from './components/SearchForm';
import OutcomeList from './components/OutcomeList';
import OutcomePage from './components/OutcomePage';

import './styles/App.css';

export default function App() {
  const { searchResults, handleAddOutcome, handleDeleteOutcome, handleSearch } = useOutcomes();

  return (
    <Router>
      <div className="app-container">
        <h1 className="title">Social Consulting Database</h1>
        <Routes>
          <Route path="/" element={
            <>
              <div className="search-and-add-container">
                <SearchForm onSearch={handleSearch} />
                <Link to="/add-outcome" className="add-outcome-button">Add Outcome</Link>
              </div>
              <OutcomeList outcomes={searchResults} onDelete={handleDeleteOutcome} />
            </>
          } />
          <Route path="/outcome/:id" element={<OutcomePage />} />
          <Route path="/add-outcome" element={
            <>
              <AddOutcomeForm onAddOutcome={handleAddOutcome} />
              <Link to="/" className="back-to-search-button">Back to Search</Link>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}