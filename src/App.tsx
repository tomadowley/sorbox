import React from 'react';
import logo from './logo.svg';
import './App.css';
import PrimeChecker from './components/PrimeChecker';
import PrimeSpiral from './components/PrimeSpiral';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <PrimeChecker />
        <div style={{ marginTop: 40 }}>
          <h3 style={{ marginBottom: 16 }}>Prime Spiral (Ulam Spiral)</h3>
          <PrimeSpiral />
        </div>
      </header>
    </div>
  );
}

export default App;
