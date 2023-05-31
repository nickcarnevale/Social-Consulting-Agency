import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/OutcomeList.css';

function OutcomeList({ outcomes, onDelete }) {
  return (
    <div className="outcomes-container">
      {outcomes.map(outcome => (
        <div key={outcome.id} className="outcome-item">
          <p className="outcome-name">{outcome.name}</p>
          <div className="buttons-container">
            <Link to={`/outcome/${outcome.id}`}>
              <button className="view-button">View Details</button>
            </Link>
            <button className="delete-button" onClick={() => onDelete(outcome.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OutcomeList;

