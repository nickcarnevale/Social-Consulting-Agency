import React, { useState } from "react";

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
      stakeholder: null,
      stakeholderDescription: null,
      scale: null,
      indicator: null,
      proxy: null,
      proxyDescription: null,
      value: null,
      euroValue: null,
      reportName: null,
      reportLink: null
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={outcome.name}
        onChange={handleChange}
        placeholder="Name of Outcome"
        required
      />
      <input
        type="text"
        name="stakeholder"
        value={outcome.stakeholder || ""}
        onChange={handleChange}
        placeholder="Stakeholder"
      />
      <input
        type="text"
        name="stakeholderDescription"
        value={outcome.stakeholderDescription || ""}
        onChange={handleChange}
        placeholder="Stakeholder Description"
      />
      <input
        type="text"
        name="scale"
        value={outcome.scale || ""}
        onChange={handleChange}
        placeholder="Scale"
      />
      <input
        type="text"
        name="indicator"
        value={outcome.indicator || ""}
        onChange={handleChange}
        placeholder="Indicator"
      />
      <input
        type="text"
        name="proxy"
        value={outcome.proxy || ""}
        onChange={handleChange}
        placeholder="Proxy"
      />
      <input
        type="text"
        name="proxyDescription"
        value={outcome.proxyDescription || ""}
        onChange={handleChange}
        placeholder="Proxy Description"
      />
      <input
        type="text"
        name="value"
        value={outcome.value || ""}
        onChange={handleChange}
        placeholder="Value"
      />
      <input
        type="text"
        name="euroValue"
        value={outcome.euroValue || ""}
        onChange={handleChange}
        placeholder="Euro Value"
      />
      <input
        type="text"
        name="reportName"
        value={outcome.reportName || ""}
        onChange={handleChange}
        placeholder="Report Name"
      />
      <input
        type="text"
        name="reportLink"
        value={outcome.reportLink || ""}
        onChange={handleChange}
        placeholder="Report Link"
      />
      <button type="submit">Add Outcome</button>
    </form>
  );
}

export default AddOutcomeForm;
