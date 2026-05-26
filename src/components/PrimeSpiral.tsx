import React, { useEffect, useRef, useState } from 'react';
import { isPrime } from '../isPrime';

// Simple Ulam spiral (prime spiral) visualization using a Canvas
// Defaults to a 101x101 grid; can be adjusted via controls.
const controlWrap: React.CSSProperties = {
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 12,
  flexWrap: 'wrap',
};

const label: React.CSSProperties = {
  color: '#e6ebff',
  fontSize: 14,
};

const input: React.CSSProperties = {
  padding: '6px 10px',
  borderRadius: 6,
  border: '1px solid #444b6e',
  background: '#1f2335',
  color: '#fff',
  width: 90,
};

const button: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: 8,
  border: 'none',
  background: 'linear-gradient(90deg,#6a85f1 0%, #7f53ac 100%)',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '0 4px 10px rgba(0,0,0,0.18)',
};

const panel: React.CSSProperties = {
  background: 'rgba(26, 28, 44, 0.9)',
  borderRadius: 12,
  padding: 16,
  boxShadow: '0 2px 14px rgba(0,0,0,0.25)',
  display: 'inline-block',
};

function drawSpiral(ctx: CanvasRenderingContext2D, grid: number, cell: number) {
  const size = grid; // grid is odd recommended
  const center = Math.floor(size / 2);
  const canvasSize = size * cell;

  // Clear
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Background
  ctx.fillStyle = '#0d1021';
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Pre-calc colors
  const primeColor = '#46e9a5';
  const nonPrimeColor = '#21253a';
  const oneColor = '#ffd166';

  // Iterate numbers and place along spiral
  let x = center;
  let y = center;
  let stepLen = 1;
  let n = 1;

  const put = (px: number, py: number, val: number) => {
    const drawX = px * cell;
    const drawY = py * cell;
    if (val === 1) {
      ctx.fillStyle = oneColor;
    } else if (isPrime(val)) {
      ctx.fillStyle = primeColor;
    } else {
      ctx.fillStyle = nonPrimeColor;
    }
    ctx.fillRect(drawX, drawY, cell - 1, cell - 1);
  };

  put(x, y, n); // place 1

  while (n < size * size) {
    // Right
    for (let i = 0; i < stepLen && n < size * size; i++) {
      x += 1;
      n += 1;
      if (x >= 0 && x < size && y >= 0 && y < size) put(x, y, n);
    }
    // Up
    for (let i = 0; i < stepLen && n < size * size; i++) {
      y -= 1;
      n += 1;
      if (x >= 0 && x < size && y >= 0 && y < size) put(x, y, n);
    }
    stepLen += 1;

    // Left
    for (let i = 0; i < stepLen && n < size * size; i++) {
      x -= 1;
      n += 1;
      if (x >= 0 && x < size && y >= 0 && y < size) put(x, y, n);
    }
    // Down
    for (let i = 0; i < stepLen && n < size * size; i++) {
      y += 1;
      n += 1;
      if (x >= 0 && x < size && y >= 0 && y < size) put(x, y, n);
    }
    stepLen += 1;
  }
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export const PrimeSpiral: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gridSize, setGridSize] = useState<number>(101);
  const [cellSize, setCellSize] = useState<number>(6);
  const [seed, setSeed] = useState(0); // used to trigger redraw via key

  // Redraw whenever params change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = clamp(Math.floor(gridSize) | 1, 11, 301); // ensure odd-ish and within bounds
    const cell = clamp(Math.floor(cellSize), 2, 20);
    canvas.width = size * cell;
    canvas.height = size * cell;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawSpiral(ctx, size, cell);
  }, [gridSize, cellSize, seed]);

  const handleRedraw = () => setSeed((s) => s + 1);

  return (
    <div style={panel}>
      <div style={controlWrap}>
        <div>
          <div style={label}>Grid size (odd recommended, 11-301)</div>
          <input
            type="number"
            value={gridSize}
            onChange={(e) => setGridSize(Number(e.target.value))}
            style={input}
          />
        </div>
        <div>
          <div style={label}>Cell size (px, 2-20)</div>
          <input
            type="number"
            value={cellSize}
            onChange={(e) => setCellSize(Number(e.target.value))}
            style={input}
          />
        </div>
        <button style={button} onClick={handleRedraw}>Redraw</button>
      </div>
      <div style={{ overflow: 'auto', maxWidth: '85vw', maxHeight: '65vh', borderRadius: 8 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default PrimeSpiral;
