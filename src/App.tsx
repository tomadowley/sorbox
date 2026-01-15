import React from 'react';
import logo from './logo.svg';
import './App.css';
import PrimeChecker from './components/PrimeChecker';
import FunStuff from './components/FunStuff';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <PrimeChecker />
        <div style={{ marginTop: 24, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <FunStuff />
        </div>
      </header>
    </div>
  );
}

export default App;
