import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callNetlifyFunction = async () => {
      try {
        // The path to your Netlify function.
        // If your function is named 'hello' in the 'functions' directory,
        // the endpoint will be '/.netlify/functions/hello'
        const response = await fetch('/.netlify/functions/chronos-api-healthcheck'); 

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json(); // Or .text() if your function returns plain text
        setData(result);
      } catch (error) {
        setError(error.message);
        console.error("Error calling Netlify function:", error);
      }
    };

    callNetlifyFunction();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Chronos Time Machines
        </p>
      </header>
      <h1>Chronos-Api-HealthCheck</h1>
      {error && <p style={{ color: 'red' }}>Error Here: {error}</p>}
      {data && (
        <div>
          <p>Data from Netlify Function for Chronos-Api-HealthCheck:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div> 
  );
}

export default App;
