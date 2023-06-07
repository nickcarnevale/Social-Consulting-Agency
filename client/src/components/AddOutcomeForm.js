import React, { useState } from 'react';
import '../styles/AddOutcomeForm.css';

function AddOutcomeForm({ onAddOutcome}) {
  const [outcome, setOutcome] = useState({
    name: "",
    nombreEspanol: "",
    stakeholder: "",
    stakeholderDescription: "",
    scale: "",
    indicator: "",
    proxy: "",
    proxyDescription: "",
    value: "",
    euroValue: "",
    reportName: "",
    reportLink: ""
  });

  const handleChange = (e) => {
    setOutcome({
      ...outcome,
      [e.target.name]: e.target.value ? e.target.value : null
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (outcome.name === "") {
      return;
    }
    onAddOutcome(outcome);

    // reset form
    setOutcome({
      name: "",
      nombreEspanol: "",
      stakeholder: "",
      stakeholderDescription: "",
      scale: "",
      indicator: "",
      proxy: "",
      proxyDescription: "",
      value: "",
      euroValue: "",
      reportName: "",
      reportLink: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-outcome-form">
      {Object.entries(outcome).map(([key, value], index) => (
        <div key={key} className="form-group">
          <label htmlFor={key}>{key === 'name' ? 'Outcome' : key.charAt(0).toUpperCase() + key.slice(1)}:</label>
          {index === 0 ? (
            <input
              type="text"
              name={key}
              id={key}
              value={value || ""}
              onChange={handleChange}
              placeholder={`Enter Outcome`}
              required
            />
          ) : (
            <input
              type="text"
              name={key}
              id={key}
              value={value || ""}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
              
            />
          )}
        </div>
      ))}
      <button type="submit">Add Outcome</button>
    </form>
  );
}

export default AddOutcomeForm;
