import React from 'react';
import '../styles/OutcomeDetails.css'; // Assuming you have an associated CSS file.

const OutcomeDetails = ({ outcome }) => (
  <div className="outcome-details-container">
    <div className="title-container">
      <h2>{outcome.name}</h2>
      {outcome.nombreespanol && <h2 className="italicized">{outcome.nombreespanol}</h2>}
    </div>
    <div className='dcontainer'>
      <p><strong>Stakeholder:</strong> <span>{outcome.stakeholder}</span></p>
      <p><strong>Stakeholder Description:</strong> {outcome.stakeholderdescription}</p>
      <p><strong>Scale:</strong> {outcome.scale}</p>
      <p><strong>Indicator:</strong> {outcome.indicator}</p>
      <p><strong>Proxy:</strong> {outcome.proxy}</p>
      <p><strong>Proxy Description:</strong> {outcome.proxydescription}</p>
      <p><strong>Value:</strong> {outcome.value}</p>
      <p><strong>Euro Value:</strong> {outcome.eurovalue}</p>
      <p><strong>Report Name:</strong> {outcome.reportname}</p>
      <p><strong>Report Link:</strong> <a href={`http://${outcome.reportlink}`}>{outcome.reportlink}</a></p>
    </div>
  </div>
);

export default OutcomeDetails;