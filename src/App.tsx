import React from 'react';
import './App.css';
import RetroFpsGame from './game/RetroFpsGame';

function App() {
  return (
    <main className="app-shell">
      <section className="hero-panel" aria-labelledby="game-title">
        <p className="eyebrow">Original canvas raycaster</p>
        <h1 id="game-title">Neon Labyrinth</h1>
        <p className="game-summary">
          Explore a procedural-styled neon facility, recover the Access Shard, survive sentry drones,
          and reach the portal. Click the canvas or press Tab to focus before using keyboard controls.
        </p>

        <RetroFpsGame />

        <div className="controls-card" aria-label="Game controls">
          <strong>Controls</strong>
          <span>W/S or ↑/↓ move</span>
          <span>A/D strafe</span>
          <span>Q/E or ←/→ turn</span>
          <span>Space or click fire</span>
          <span>F or Enter interact</span>
          <span>R restart</span>
        </div>
      </section>
    </main>
  );
}

export default App;
