import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// --- Types
type AlgoKey = 'bubble' | 'selection' | 'insertion';
interface Step {
  array: number[];
  highlight?: [number, number] | null; // indices being compared/swapped
}

// --- Step generators (pure, no side effects)
function bubbleSteps(src: number[]): Step[] {
  const arr = src.slice();
  const steps: Step[] = [{ array: arr.slice(), highlight: null }];
  const n = arr.length;
  let swapped: boolean;
  do {
    swapped = false;
    for (let i = 1; i < n; i++) {
      steps.push({ array: arr.slice(), highlight: [i - 1, i] });
      if (arr[i - 1] > arr[i]) {
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        swapped = true;
        steps.push({ array: arr.slice(), highlight: [i - 1, i] });
      }
    }
  } while (swapped);
  steps.push({ array: arr.slice(), highlight: null });
  return steps;
}

function selectionSteps(src: number[]): Step[] {
  const arr = src.slice();
  const steps: Step[] = [{ array: arr.slice(), highlight: null }];
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      steps.push({ array: arr.slice(), highlight: [minIdx, j] });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({ array: arr.slice(), highlight: [minIdx, j] });
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({ array: arr.slice(), highlight: [i, minIdx] });
    }
  }
  steps.push({ array: arr.slice(), highlight: null });
  return steps;
}

function insertionSteps(src: number[]): Step[] {
  const arr = src.slice();
  const steps: Step[] = [{ array: arr.slice(), highlight: null }];
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      steps.push({ array: arr.slice(), highlight: [j, j + 1] });
      arr[j + 1] = arr[j];
      j--;
      steps.push({ array: arr.slice(), highlight: [j, j + 1] });
    }
    arr[j + 1] = key;
    steps.push({ array: arr.slice(), highlight: [j + 1, i] });
  }
  steps.push({ array: arr.slice(), highlight: null });
  return steps;
}

function genSteps(algo: AlgoKey, data: number[]): Step[] {
  switch (algo) {
    case 'bubble':
      return bubbleSteps(data);
    case 'selection':
      return selectionSteps(data);
    case 'insertion':
      return insertionSteps(data);
    default:
      return [{ array: data.slice(), highlight: null }];
  }
}

// --- Component styles (inline to keep it self-contained)
const wrapperStyle: React.CSSProperties = {
  marginTop: 28,
  padding: '1rem 1.25rem',
  background: 'rgba(16,18,28,0.88)',
  borderRadius: 12,
  color: '#e9ecef',
  boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
  minWidth: 520,
};

const controlsRow: React.CSSProperties = {
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  flexWrap: 'wrap',
  marginBottom: 12,
};

const selectStyle: React.CSSProperties = {
  padding: '6px 10px',
  background: '#1f2235',
  color: '#fff',
  border: '1px solid #3b3f5c',
  borderRadius: 8,
};

const btn: React.CSSProperties = {
  padding: '8px 14px',
  border: 'none',
  borderRadius: 8,
  color: '#0b1020',
  background: 'linear-gradient(90deg,#8EC5FC 0%,#E0C3FC 100%)',
  fontWeight: 700,
  cursor: 'pointer',
};

const btnGhost: React.CSSProperties = {
  ...btn,
  background: 'transparent',
  color: '#e9ecef',
  border: '1px solid #3b3f5c',
};

const barsWrap: React.CSSProperties = {
  height: 180,
  display: 'flex',
  alignItems: 'flex-end',
  gap: 4,
  padding: '12px 10px',
  background: '#0f1220',
  borderRadius: 10,
  border: '1px solid #1e2238',
};

function useInterval(callback: () => void, delay: number | null) {
  const savedRef = useRef(callback);
  useEffect(() => {
    savedRef.current = callback;
  }, [callback]);
  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedRef.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export const SortingVisualizer: React.FC = () => {
  const [algo, setAlgo] = useState<AlgoKey>('bubble');
  const [size, setSize] = useState(20);
  const [speed, setSpeed] = useState(250); // ms per step
  const [seed, setSeed] = useState(1);
  const [cursor, setCursor] = useState(0);
  const [playing, setPlaying] = useState(false);

  // deterministic random for reproducible arrays per seed
  const data = useMemo(() => {
    const arr: number[] = [];
    let x = seed;
    for (let i = 0; i < size; i++) {
      // simple LCG for stability (0..1)
      x = (1103515245 * x + 12345) % 0x80000000;
      const v = 10 + Math.floor(((x / 0x80000000) * 90)); // 10..100
      arr.push(v);
    }
    return arr;
  }, [size, seed]);

  const steps = useMemo(() => genSteps(algo, data), [algo, data]);
  const step = steps[Math.min(cursor, steps.length - 1)];

  const reset = useCallback(() => {
    setCursor(0);
    setPlaying(false);
  }, []);

  const randomize = useCallback(() => {
    setSeed(s => (s + Math.floor(Math.random() * 1000) + 1) | 0);
    setCursor(0);
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => setPlaying(p => !p), []);

  const stepOnce = useCallback(() => {
    setCursor(c => Math.min(c + 1, steps.length - 1));
  }, [steps.length]);

  useInterval(
    () => {
      setCursor(c => {
        if (c >= steps.length - 1) {
          setPlaying(false);
          return c;
        }
        return c + 1;
      });
    },
    playing ? Math.max(30, speed) : null
  );

  useEffect(() => {
    // when algo/size/seed changes, stop playing and reset cursor
    setPlaying(false);
    setCursor(0);
  }, [algo, size, seed]);

  return (
    <div style={wrapperStyle} data-testid="sorting-visualizer">
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: '#c7d2fe' }}>
        Sorting Visualizer
      </div>
      <div style={controlsRow}>
        <label>
          <span style={{ marginRight: 8 }}>Algorithm</span>
          <select
            value={algo}
            onChange={e => setAlgo(e.target.value as AlgoKey)}
            style={selectStyle}
          >
            <option value="bubble">Bubble</option>
            <option value="selection">Selection</option>
            <option value="insertion">Insertion</option>
          </select>
        </label>
        <label>
          <span style={{ margin: '0 8px 0 12px' }}>Size</span>
          <input
            type="range"
            min={5}
            max={60}
            value={size}
            onChange={e => setSize(parseInt(e.target.value, 10))}
          />
          <span style={{ marginLeft: 6 }}>{size}</span>
        </label>
        <label>
          <span style={{ margin: '0 8px 0 12px' }}>Speed</span>
          <input
            type="range"
            min={30}
            max={1000}
            step={10}
            value={speed}
            onChange={e => setSpeed(parseInt(e.target.value, 10))}
          />
          <span style={{ marginLeft: 6 }}>{speed}ms</span>
        </label>
        <button style={btn} onClick={toggle} data-testid="viz-toggle">
          {playing ? 'Pause' : 'Play'}
        </button>
        <button style={btnGhost} onClick={stepOnce} data-testid="viz-step">
          Step
        </button>
        <button style={btnGhost} onClick={reset} data-testid="viz-reset">
          Reset
        </button>
        <button style={btnGhost} onClick={randomize} data-testid="viz-rand">
          Randomize
        </button>
      </div>
      <div style={barsWrap} aria-label="bars">
        {step.array.map((v, i) => {
          const isH = step.highlight && (i === step.highlight[0] || i === step.highlight[1]);
          return (
            <div
              key={i}
              title={`${v}`}
              style={{
                width: `${Math.max(4, Math.floor(360 / Math.max(6, step.array.length)))}px`,
                height: `${Math.max(8, Math.floor((v / 100) * 160))}px`,
                background: isH ? 'linear-gradient(90deg,#34e88b,#00d4ff)' : 'linear-gradient(90deg,#667eea,#764ba2)',
                borderRadius: 4,
                boxShadow: isH ? '0 0 10px rgba(0,212,255,0.5)' : 'none',
              }}
            />
          );
        })}
      </div>
      <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>
        Step {Math.min(cursor + 1, steps.length)} / {steps.length}
      </div>
    </div>
  );
};

export default SortingVisualizer;
