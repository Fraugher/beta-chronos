    import React from "react"
    // App.js
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