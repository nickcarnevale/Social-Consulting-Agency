import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSingleOutcome from './useSingleOutcome';
import OutcomeDetails from './OutcomeDetails';
import useOutcomes from './UseOutcomes';
import '../styles/OutcomePage.css';

function OutcomePage() {
  const { id } = useParams();
  const { outcome, loading, error } = useSingleOutcome(id);
  const navigate = useNavigate();
  const { handleUpdateOutcome } = useOutcomes();

  const [editing, setEditing] = useState(false);
  const [updatedOutcome, setUpdatedOutcome] = useState({});

  const onToggleEditing = () => {
    setEditing(!editing);
    setUpdatedOutcome(outcome);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedOutcome(prevOutcome => ({
      ...prevOutcome,
      [name]: value || "",
    }));
  };

  const onUpdate = (event) => {
    event.preventDefault(); // prevent form submission
    handleUpdateOutcome(id, updatedOutcome);
    setEditing(false);
  };

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="outcome-details-container">
      {editing ? (
        <form onSubmit={onUpdate} className="add-outcome-form">
          <label htmlFor="name">Outcome:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={updatedOutcome.name || outcome.name || ""}
            onChange={handleChange}
            placeholder="
            "
            required
          />
          <label htmlFor="nombreEspanol">Nombre Espanol:</label>
          <input
            type="text"
            name="nombreEspanol"
            id="nombreEspanol"
            value={updatedOutcome.nombreEspanol || outcome.nombreespanol || ""}
            onChange={handleChange}
            placeholder=""
          />
          <label htmlFor="stakeholder">Stakeholder:</label>
          <input
            type="text"
            name="stakeholder"
            id="stakeholder"
            value={updatedOutcome.stakeholder || outcome.stakeholder || ""}
            onChange={handleChange}
            placeholder=""
          />
          <label htmlFor="stakeholderDescription">Stakeholder Description:</label>
          <input
            type="text"
            name="stakeholderDescription"
            id="stakeholderDescription"
            value={updatedOutcome.stakeholderDescription || outcome.stakeholderdescription || ""}
            onChange={handleChange}
            placeholder=""
          />        
          <label htmlFor="scale">Scale:</label>
          <input
            type="text"
            name="scale"
            id="scale"
            value={updatedOutcome.scale || outcome.scale || ""}
            onChange={handleChange}
            placeholder=""
          />
          <label htmlFor="indicator">Indicator:</label>
          <input
            type="text"
            name="indicator"
            id="indicator"
            value={updatedOutcome.indicator || outcome.indicator || ""}
            onChange={handleChange}
            placeholder=""
          /> 
          <label htmlFor="proxy">Proxy:</label>
          <input
            type="text"
            name="proxy"
            id="proxy"
            value={updatedOutcome.proxy || outcome.proxy || ""}
            onChange={handleChange}
            placeholder=""
          /> 
          <label htmlFor="proxyDescription">Proxy Description:</label>
          <input
            type="text"
            name="proxyDescription"
            id="proxyDescription"
            value={updatedOutcome.proxyDescription || outcome.proxydescription || ""}
            onChange={handleChange}
            placeholder=""
          />
          <label htmlFor="value">Value:</label>
          <input
            type="text"
            name="value"
            id="value"
            value={updatedOutcome.value || outcome.value || ""}
            onChange={handleChange}
            placeholder=""
          /> 
          <label htmlFor="euroValue">Euro Value:</label>
          <input
            type="text"
            name="euroValue"
            id="euroValue"
            value={updatedOutcome.euroValue || outcome.eurovalue || ""}
            onChange={handleChange}
            placeholder=""
          /> 
          <label htmlFor="reportName">Report Name:</label>
          <input
            type="text"
            name="reportName"
            id="reportName"
            value={updatedOutcome.reportName || outcome.reportname || ""}
            onChange={handleChange}
            placeholder=""
          /> 
          <label htmlFor="reportLink">Report Link:</label>
          <input
            type="text"
            name="reportLink"
            id="reportLink"
            value={updatedOutcome.reportLink || outcome.reportlink || ""}
            onChange={handleChange}
            placeholder=""
          /> 
          <button type="submit">Update Outcome</button>
        </form>
      ) : (
        <div>
          <OutcomeDetails outcome={outcome} />
          <button className="action-update" onClick={onToggleEditing}>Edit Outcome</button>
        </div>
      )}
      <div className="button-container">
        <button className="action-button" onClick={() => navigate(-1)}>Go back</button>
      </div>
    </div>
  );
}

export default OutcomePage;
