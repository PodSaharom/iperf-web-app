import React, { useState, useEffect } from 'react';
import IperfChart from './IperfChart';

function IperfTest() {
  const [results, setResults] = useState(null);

  const handleRunTest = () => {
    fetch('http://localhost:5000/api/run-iperf')
      .then(response => response.json())
      .then(data => setResults(data))
      .catch(error => console.error('Error running iperf test:', error));
  };

  return (
    <div>
      <button onClick={handleRunTest}>Запустить тест iperf</button>
      {results && (
        <div>
          <h3>Результаты теста:</h3>
          <IperfChart data={results} />
        </div>
      )}
    </div>
  );
}

export default IperfTest;
