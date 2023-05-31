import React, { useState } from 'react';
import '../styles/AddOutcomeForm.css';

function AddOutcomeForm({ onAddOutcome }) {
  const [outcome, setOutcome] = useState({
    name: "",
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
      {Object.entries(outcome).map(([key, value]) => (
        <div key={key} className="form-group">
          <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
          <input
            type="text"
            name={key}
            id={key}
            value={value || ""}
            onChange={handleChange}
            placeholder={`Enter ${key}`}
            required
          />
        </div>
      ))}
      <button type="submit">Add Outcome</button>
    </form>
  );
}

export default AddOutcomeForm;
