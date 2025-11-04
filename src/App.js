    // App.js
    import React, { useState, useEffect } from 'react';
    import MachineList from './components/MachineList.js';
    import './App.css';
    
    function App() {
      const verboseOn=false;
      return (
        <div className="App">
          <MachineList verbose={verboseOn} />
        </div>
      );
    }

    export default App;