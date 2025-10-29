    // App.js
    import React, { useState, useEffect } from 'react';

    function App() {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/.netlify/functions/hello'); // Adjust the path if you have redirects
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
          } catch (e) {
            setError(e);
          } finally {
            setLoading(false);
          }
        };

        fetchData();
      }, []);

      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error.message}</div>;

      return (
        <div className="App">
          <h1>Data from Netlify Function 5:</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          {data && data.items && (
            <ul>
              {data.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    export default App;



// // src/App.js (or any other component)
// import React, { useState, useEffect } from 'react';

// function App() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/.netlify/functions/hello'); // Path to your Netlify function
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (e) {
//         setError(e.message);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Netlify Function Data 4</h1>
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//       {data ? (
//         <pre>{JSON.stringify(data, null, 2)}</pre> // Displays JSON in a readable format
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default App;
// // import logo from './logo.svg';
// // import './App.css';

// // import React, { useState, useEffect } from 'react';

// //     function App() {
// //       const [data, setData] = useState(null);
// //       const [loading, setLoading] = useState(true);
// //       const [error, setError] = useState(null);

// //       useEffect(() => {
// //         const fetchData = async () => {
//           try {
//             const response = await fetch('/.netlify/functions/function-test'); // Adjust the path if you have redirects
//             if (!response.ok) {
//               throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const result = await response.json();
//             setData(result);
//           } catch (e) {
//             setError(e);
//           } finally {
//             setLoading(false);
//           }
//         };

//         fetchData();
//       }, []);

//       if (loading) return <div>Loading...</div>;
//       if (error) return <div>Error: {error.message}</div>;

//       return (
//         <div className="App">
//                 <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Chronos Time Machines
//         </p>
//       </header>
//       <h1>Chronos-Api-HealthCheck</h1>

//           <pre>{JSON.stringify(data, null, 2)}</pre>
//           {data && data.items && (
//             <ul>
//               {data.items.map((item, index) => (
//                 <li key={index}>{item}</li>
//               ))}
//             </ul>
//           )}
//         </div>
//       );
//     }

//     export default App;