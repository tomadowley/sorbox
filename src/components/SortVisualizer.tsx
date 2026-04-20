import React, { useEffect, useMemo, useRef, useState } from 'react';

// Style blocks (inline, to match local style approach)
const container: React.CSSProperties = {
  marginTop: 24,
  background: 'rgba(30,34,50,0.88)',
  borderRadius: 12,
  padding: '1.25rem 1.5rem',
  boxShadow: '0 2px 14px 0 rgba(0,0,0,0.19)',
  color: '#fff',
};

const headerRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  flexWrap: 'wrap',
  marginBottom: 12,
};

const label: React.CSSProperties = { fontSize: 14, opacity: 0.9 };
const selectStyle: React.CSSProperties = {
  background: '#23263a',
  color: '#fff',
  border: '1px solid #555',
  borderRadius: 6,
  padding: '6px 10px',
};
const smallBtn: React.CSSProperties = {
  padding: '6px 12px',
  fontSize: 14,
  borderRadius: 6,
  border: 'none',
  background: 'linear-gradient(90deg, #48c6ef 0%, #6f86d6 100%)',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '0 2px 6px rgba(36,47,87,0.22)'
};

const barsWrap: React.CSSProperties = {
  position: 'relative',
  height: 200,
  borderRadius: 8,
  background: 'rgba(18,20,32,0.6)',
  display: 'flex',
  alignItems: 'flex-end',
  gap: 3,
  padding: '10px 10px 8px 10px',
  overflow: 'hidden'
};

const barBase: React.CSSProperties = {
  flex: 1,
  background: 'linear-gradient(180deg, #60d394 0%, #46b99b 100%)',
  borderRadius: 4,
  transition: 'height 120ms ease, background 120ms ease',
};

const barActive: React.CSSProperties = {
  background: 'linear-gradient(180deg, #ffd166 0%, #fca311 100%)',
};

const barSwap: React.CSSProperties = {
  background: 'linear-gradient(180deg, #ef476f 0%, #d62839 100%)',
};

// Bubble sort step representation
type Step = {
  array: number[];
  i: number; // comparing i-1 and i
  swapped: boolean;
};

function makeRandomArray(size: number, min = 10, max = 100): number[] {
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
}

function bubbleSteps(source: number[]): Step[] {
  const arr = source.slice();
  const out: Step[] = [];
  let swapped = true;
  let n = arr.length;
  while (swapped) {
    swapped = false;
    for (let i = 1; i < n; i++) {
      const didSwap = arr[i - 1] > arr[i];
      if (didSwap) {
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        swapped = true;
      }
      out.push({ array: arr.slice(), i, swapped: didSwap });
    }
    n -= 1;
  }
  return out;
}

const algorithmOptions = [
  { id: 'bubble', name: 'Bubble Sort' },
] as const;

type AlgoId = typeof algorithmOptions[number]['id'];

function stepsFor(algo: AlgoId, arr: number[]): Step[] {
  switch (algo) {
    case 'bubble':
      return bubbleSteps(arr);
    default:
      return [];
  }
}

export const SortVisualizer: React.FC = () => {
  const [algo, setAlgo] = useState<AlgoId>('bubble');
  const [size, setSize] = useState<number>(24);
  const [speed, setSpeed] = useState<number>(60); // ms per step
  const [seed, setSeed] = useState<number>(Date.now());
  const [running, setRunning] = useState<boolean>(false);
  const [idx, setIdx] = useState<number>(0);

  const baseArray = useMemo(() => makeRandomArray(size), [size, seed]);
  const steps = useMemo(() => stepsFor(algo, baseArray), [algo, baseArray]);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      setIdx((prev) => {
        const next = prev + 1;
        if (next >= steps.length) {
          setRunning(false);
          return prev;
        }
        return next;
      });
    };
    const id = window.setInterval(tick, Math.max(16, speed));
    timerRef.current = id;
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [running, speed, steps.length]);

  // Reset index when inputs change
  useEffect(() => {
    setIdx(0);
    setRunning(false);
  }, [algo, size, seed]);

  const current = steps[idx] ?? { array: baseArray, i: -1, swapped: false };
  const maxVal = Math.max(...current.array, 100);

  return (
    <div style={container} data-testid="sort-visualizer">
      <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 16 }}>Sorting Visualizer</div>

      <div style={headerRow}>
        <span style={label}>Algorithm</span>
        <select
          value={algo}
          onChange={(e) => setAlgo(e.target.value as AlgoId)}
          style={selectStyle}
        >
          {algorithmOptions.map((op) => (
            <option key={op.id} value={op.id}>{op.name}</option>
          ))}
        </select>

        <span style={{ ...label, marginLeft: 8 }}>Size</span>
        <select
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value, 10))}
          style={selectStyle}
        >
          {[12, 16, 20, 24, 28, 32, 40].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <span style={{ ...label, marginLeft: 8 }}>Speed</span>
        <select
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value, 10))}
          style={selectStyle}
        >
          {[
            { n: 30, label: 'Fast' },
            { n: 60, label: 'Normal' },
            { n: 120, label: 'Slow' },
            { n: 240, label: 'Very Slow' },
          ].map((opt) => (
            <option key={opt.n} value={opt.n}>{opt.label}</option>
          ))}
        </select>

        <button
          style={smallBtn}
          onClick={() => setSeed(Date.now())}
        >
          Shuffle
        </button>

        {!running ? (
          <button style={smallBtn} onClick={() => setRunning(true)}>Play</button>
        ) : (
          <button style={smallBtn} onClick={() => setRunning(false)}>Pause</button>
        )}
        <button style={smallBtn} onClick={() => setIdx((i) => Math.max(0, i - 1))}>Prev</button>
        <button style={smallBtn} onClick={() => setIdx((i) => Math.min(steps.length - 1, i + 1))}>Next</button>
      </div>

      <div style={barsWrap}>
        {current.array.map((v, i) => {
          const height = Math.max(8, Math.round((v / maxVal) * 100));
          const isActive = i === current.i || i === current.i - 1;
          const style: React.CSSProperties = {
            ...barBase,
            height: `${height}%`,
            ...(isActive ? (current.swapped ? barSwap : barActive) : {}),
          };
          return <div key={i} style={style} />;
        })}
      </div>

      <div style={{ marginTop: 10, fontSize: 13, opacity: 0.9 }}>
        Step {Math.min(idx + 1, steps.length)} / {Math.max(steps.length, 1)}
        {running ? ' • Running' : ''}
      </div>
    </div>
  );
};

export default SortVisualizer;
