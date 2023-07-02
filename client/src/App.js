import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {AuthProvider, RequireAuth} from 'react-auth-kit';

import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import useOutcomes from './components/UseOutcomes';
import AddOutcomeForm from './components/AddOutcomeForm';
import SearchForm from './components/SearchForm';
import OutcomeList from './components/OutcomeList';
import Navigate from './components/Navigate';
import OutcomePage from './components/OutcomePage';
import DataDump from './components/DataDump';

import './styles/App.css';

export default function App() {
  const { searchResults, handleAddOutcome, handleDeleteOutcome, handleSearch, refreshOutcomes, handleOutcomeSearch, handleFilterChange, filteredOutcomes, handleExport, handleBulkTransfer } = useOutcomes();
  

  return (
    <AuthProvider authStorageType={'cookie'}
                  authStorageName={'_auth_t'}
                  authTimeStorageName={'_auth_time'}
                  stateAutoCleanUp={true}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "https:"} 
    >      
      <Router>
        <div className="app-container">
          <h1 className="title">Social Consulting Agency Outcome Database</h1>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/home" element={
                <>
                  <RequireAuth loginPath={'/'}>
                    <div className="search-and-add-container">
                      <SearchForm onSearch={handleSearch} /> 
                      <Link to="/add-outcome" className="add-outcome-button">Add Outcome</Link>
                      <Link onClick={refreshOutcomes} to="/outcomes" className="add-outcome-button">Navigate Outcomes</Link>
                      
                    </div>
                    <OutcomeList outcomes={searchResults} />
                    <p>✔ means outcome has a value</p>
                    <LogoutButton/>
                  </RequireAuth>
                </>
            } />
            <Route path="/outcome/:id" element={
              <RequireAuth loginPath="/">
                <OutcomePage />
              </RequireAuth>
            } />
            <Route path="/add-outcome" element={
              <>
                <RequireAuth loginPath="/">
                  <AddOutcomeForm onAddOutcome={handleAddOutcome}/>
                  <DataDump onBulkTransfer={handleBulkTransfer}/>
                  <Link to="/home" className="back-to-search-button">Back to Search</Link>
                </RequireAuth>
              </>
            } />
            <Route path="/outcomes" element={
              <>
                <RequireAuth loginPath="/">
                  <div className = "search-and-add-container">
                    <SearchForm onSearch={handleOutcomeSearch} /> 
                    <select onChange={e => handleFilterChange(e.target.value)} className="filter-dropdown">
                      <option value="id">Filter</option>
                      <option value="id">Recently Added</option>
                      <option value="alphabetical">Sort Alphabetically</option>
                    </select>
                  </div>
                  <Navigate outcomes={filteredOutcomes} onDelete={handleDeleteOutcome}/>
                  <Link to="/home" className="back-to-search-button">Back to Search</Link>
                  <button onClick={handleExport} className="export-button">Export to CSV</button>
                  <p>✔ means outcome has a value</p>
                </RequireAuth>
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
    
  );
}