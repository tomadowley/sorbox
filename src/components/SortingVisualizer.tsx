import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AlgoName, Frame, getSteps } from '../sortSteps';

const panelStyle: React.CSSProperties = {
  marginTop: 32,
  background: 'linear-gradient(180deg, #101322, #0c0f1a)',
  borderRadius: 12,
  padding: '1rem 1.25rem',
  color: '#e6e9f3',
  width: 'min(940px, 92vw)'
};

const controlsStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 12,
  marginBottom: 12,
};

const selectStyle: React.CSSProperties = {
  padding: '6px 10px',
  borderRadius: 8,
  background: '#191e2e',
  border: '1px solid #2a3148',
  color: '#dfe6ff',
};

const btnStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: 8,
  border: 'none',
  background: 'linear-gradient(90deg, #48c6ef 0%, #6f86d6 100%)',
  color: '#0b0f1c',
  fontWeight: 700,
  cursor: 'pointer',
};

const sliderStyle: React.CSSProperties = { accentColor: '#6f86d6' } as React.CSSProperties;

const barContainerStyle: React.CSSProperties = {
  position: 'relative',
  height: 240,
  background: 'radial-gradient(1000px 300px at 50% 100%, rgba(111,134,214,0.25), transparent 60%)',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'flex-end',
  gap: 2,
  padding: 12,
  overflow: 'hidden',
};

const labelStyle: React.CSSProperties = { opacity: 0.8, fontSize: 14 };

function useInterval(callback: () => void, delay: number | null) {
  const savedRef = useRef(callback);
  useEffect(() => { savedRef.current = callback; }, [callback]);
  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedRef.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

function Bars({ values }: { values: number[] }) {
  const max = useMemo(() => Math.max(1, ...values), [values]);
  return (
    <div style={barContainerStyle}>
      {values.map((v, i) => {
        const h = Math.max(6, Math.round((v / max) * 220));
        return (
          <div
            key={i}
            title={String(v)}
            style={{
              height: h,
              width: `${Math.max(2, Math.floor(600 / Math.max(8, values.length)))}px`,
              background: 'linear-gradient(180deg, #48c6ef, #6f86d6)',
              boxShadow: '0 6px 18px rgba(36,47,87,0.3)',
              borderRadius: 3,
            }}
          />
        );
      })}
    </div>
  );
}

const defaultSize = 30;

export const SortingVisualizer: React.FC = () => {
  const [algo, setAlgo] = useState<AlgoName>('bubble');
  const [size, setSize] = useState<number>(defaultSize);
  const [speed, setSpeed] = useState<number>(60); // ms per frame
  const [frames, setFrames] = useState<Frame[]>([]);
  const [idx, setIdx] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);

  const current = frames[idx] ?? [];

  function randomArray(n: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < n; i++) {
      result.push(5 + Math.floor(Math.random() * 95));
    }
    return result;
  }

  function generate() {
    const arr = randomArray(size);
    const steps = getSteps(algo, arr);
    setFrames(steps);
    setIdx(0);
    setPlaying(false);
  }

  function step() {
    setIdx((i) => Math.min(i + 1, Math.max(0, frames.length - 1)));
  }

  function reset() {
    setIdx(0);
    setPlaying(false);
  }

  useInterval(() => {
    if (!playing) return;
    setIdx((i) => {
      const next = i + 1;
      if (next >= frames.length - 1) {
        setPlaying(false);
        return frames.length - 1;
      }
      return next;
    });
  }, playing ? Math.max(10, speed) : null);

  useEffect(() => {
    // Auto-generate on mount
    if (!frames.length) generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={panelStyle} data-testid="sorting-visualizer">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Sorting Visualizer</h3>
        <span style={labelStyle}>Frames: {frames.length} • Index: {idx}</span>
      </div>

      <div style={controlsStyle}>
        <label style={labelStyle}>
          Algorithm:
          <select
            value={algo}
            onChange={(e) => setAlgo(e.target.value as AlgoName)}
            style={{ ...selectStyle, marginLeft: 8 }}
          >
            <option value="bubble">Bubble</option>
            <option value="selection">Selection</option>
            <option value="insertion">Insertion</option>
          </select>
        </label>

        <label style={labelStyle}>
          Size: {size}
          <input
            type="range"
            min={8}
            max={120}
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value, 10))}
            style={{ ...sliderStyle, marginLeft: 8 }}
          />
        </label>

        <label style={labelStyle}>
          Speed (ms): {speed}
          <input
            type="range"
            min={10}
            max={200}
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value, 10))}
            style={{ ...sliderStyle, marginLeft: 8 }}
          />
        </label>

        <button style={btnStyle} onClick={generate}>Generate</button>
        <button style={btnStyle} onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</button>
        <button style={btnStyle} onClick={step}>Step</button>
        <button style={btnStyle} onClick={reset}>Reset</button>
      </div>

      <Bars values={current} />

      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between' }}>
        <span style={labelStyle}>
          Hint: Generate → Play. Try different algorithms and sizes.
        </span>
      </div>
    </div>
  );
};

export default SortingVisualizer;
