import React, { useEffect, useState } from 'react';
import './App.css';
import { getAllOutcomes } from './API';
import { deleteOutcome } from './OutcomeUtils';
import AddOutcomeForm from './AddOutcomeForm';


function App() {
  const [outcomes, setOutcomes] = useState([]);

  useEffect(() => {
    getAllOutcomes().then(setOutcomes);
  }, []);

  const fetchOutcomes = () => {
    getAllOutcomes().then(setOutcomes);
  };


  const handleAddOutcome = (outcome) => {
    fetch('http://localhost:3001/outcomes', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(outcome),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const handleDeleteOutcome = (id) => {
    deleteOutcome(id)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        fetchOutcomes();
      })
      .catch((error) => {
        console.error('Error deleting outcome:', error);
      });
  };

  return (
    <div className="app-container">
      <h1 className="title">Social Consulting Database</h1>
      <div className="outcomes-container">
        {outcomes.map(outcome => (
          <div key={outcome.id} className="outcome-item">
            <p>{outcome.name}</p>
            <button className="delete-button" onClick={() => handleDeleteOutcome(outcome.id)}>Delete</button>
          </div>
        ))}
      </div>
      <AddOutcomeForm onAddOutcome={handleAddOutcome} />
    </div>
  );
}

export default App;