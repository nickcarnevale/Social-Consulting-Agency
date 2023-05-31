import React from 'react';
import '../styles/OutcomeDetails.css'; // Assuming you have an associated CSS file.

const OutcomeDetails = ({ outcome }) => (
  <div className="outcome-details-container">
    <h2>{outcome.name}</h2>
    <p><strong>Stakeholder:</strong> {outcome.stakeholder}</p>
    <p><strong>Scale:</strong> {outcome.scale}</p>
    <p><strong>Indicator:</strong> {outcome.indicator}</p>
    <p><strong>Proxy:</strong> {outcome.proxy}</p>
    <p><strong>Proxy Description:</strong> {outcome.proxyDescription}</p>
    <p><strong>Value:</strong> {outcome.value}</p>
    <p><strong>Euro Value:</strong> {outcome.euroValue}</p>
    <p><strong>Report Name:</strong> {outcome.reportName}</p>
    <p><strong>Report Link:</strong> <a href={outcome.reportLink}>{outcome.reportLink}</a></p>
  </div>
);

export default OutcomeDetails;