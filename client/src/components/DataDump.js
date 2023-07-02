import React, { useState } from 'react';
import Papa from 'papaparse';

function DataDump({ onBulkTransfer }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleBulkTransfer = () => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvData = e.target.result;
        const outcomes = [];

        try {
          const parsedData = Papa.parse(csvData, { header: true, skipEmptyLines: true });
          parsedData.data.slice(0).forEach((row) => { // Start from index 1 to skip the header row
            const outcome = {
              name: row.name,
              nombreEspanol: row.nombreespanol,
              stakeholder: row.stakeholder,
              stakeholderDescription: row.stakeholderdescription,
              scale: row.scale,
              indicator: row.indicator,
              proxy: row.proxy,
              proxyDescription: row.proxydescription,
              value: row.value,
              euroValue: row.eurovalue,
              reportName: row.reportname,
              reportLink: row.reportlink,
            };
            outcomes.push(outcome);
          });

          onBulkTransfer(outcomes);
        } catch (error) {
          console.error('Error parsing CSV file:', error);
        }
      };

      reader.readAsText(selectedFile);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />
      <button type="button" onClick={handleBulkTransfer}>
        Bulk Transfer
      </button>
    </div>
  );
}

export default DataDump;
