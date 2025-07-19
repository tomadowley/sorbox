import React from 'react';
import logo from './logo.svg';
import './App.css';
import FractalGame from './components/FractalGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FractalGame />
      </header>
    </div>
  );
}

export default App;
