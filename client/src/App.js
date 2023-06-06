import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import useOutcomes from './components/UseOutcomes';
import AddOutcomeForm from './components/AddOutcomeForm';
import SearchForm from './components/SearchForm';
import OutcomeList from './components/OutcomeList';
import OutcomePage from './components/OutcomePage';
import OutcomeFilter from './components/OutcomeFilter';

import './styles/App.css';

export default function App() {
  const { searchResults, handleAddOutcome, handleDeleteOutcome, handleSearch } = useOutcomes();
  const { filteredOutcomes, handleFilterChange, handleOutcomeSearch, handleExport, refreshOutcomes} = OutcomeFilter(); 
  

  return (
    <Router>
      <div className="app-container">
        <h1 className="title">Social Consulting Agency Outcome Database</h1>
        <Routes>
          <Route path="/" element={
            <>
              <div className="search-and-add-container">
                <SearchForm onSearch={handleSearch} /> 
                <Link to="/add-outcome" className="add-outcome-button">Add Outcome</Link>
                <Link onClick={refreshOutcomes} to="/outcomes" className="add-outcome-button">Navigate Outcomes</Link>
              </div>
              <OutcomeList outcomes={searchResults} onDelete={handleDeleteOutcome} />
            </>
          } />
          <Route path="/outcome/:id" element={<OutcomePage />} />
          <Route path="/add-outcome" element={
            <>
              <AddOutcomeForm onAddOutcome={handleAddOutcome} onRefresh={refreshOutcomes}/>
              <Link to="/" className="back-to-search-button">Back to Search</Link>
            </>
          } />
          <Route path="/outcomes" element={
            <>
              <div className = "search-and-add-container">
                <SearchForm onSearch={handleOutcomeSearch} /> 
                <select onChange={e => handleFilterChange(e.target.value)} className="filter-dropdown">
                  <option value="id">Filter</option>
                  <option value="id">Recently Added</option>
                  <option value="alphabetical">Sort Alphabetically</option>
                </select>
              </div>
              <OutcomeList outcomes={filteredOutcomes} onDelete={handleDeleteOutcome} />
              <Link to="/" className="back-to-search-button">Back to Search</Link>
              <button onClick={handleExport} className="export-button">Export to CSV</button>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}