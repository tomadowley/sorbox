import React, { useCallback, useEffect, useRef, useState } from 'react';

// Simple Snake game rendered on a canvas. Arrow keys to move. Space to pause. R to restart.
// Designed to be self-contained and lightweight for CRA + TS.

type Point = { x: number; y: number };

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const CANVAS_SIZE = 420; // px
const CELL_SIZE = 20; // px
const COLS = Math.floor(CANVAS_SIZE / CELL_SIZE);
const ROWS = Math.floor(CANVAS_SIZE / CELL_SIZE);
const TICK_MS = 120;

function randomCell(): Point {
  return {
    x: Math.floor(Math.random() * COLS),
    y: Math.floor(Math.random() * ROWS),
  };
}

function equal(a: Point, b: Point) {
  return a.x === b.x && a.y === b.y;
}

function nextHead(head: Point, dir: Direction): Point {
  switch (dir) {
    case 'UP':
      return { x: head.x, y: head.y - 1 };
    case 'DOWN':
      return { x: head.x, y: head.y + 1 };
    case 'LEFT':
      return { x: head.x - 1, y: head.y };
    case 'RIGHT':
      return { x: head.x + 1, y: head.y };
  }
}

function withinBounds(p: Point) {
  return p.x >= 0 && p.x < COLS && p.y >= 0 && p.y < ROWS;
}

function collides(point: Point, body: Point[]) {
  return body.some((s) => equal(s, point));
}

const panelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginTop: 12,
  justifyContent: 'center',
};

const buttonStyle: React.CSSProperties = {
  padding: '8px 14px',
  fontSize: 16,
  borderRadius: 6,
  border: 'none',
  background: 'linear-gradient(90deg, #48c6ef 0%, #6f86d6 100%)',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '0 2px 6px rgba(36,47,87,0.22)',
};

const labelStyle: React.CSSProperties = {
  color: '#f5f6fa',
  fontWeight: 600,
};

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const cardStyle: React.CSSProperties = {
  background: 'rgba(30,34,50,0.88)',
  borderRadius: 12,
  padding: '1rem 1.25rem',
  boxShadow: '0 2px 14px 0 rgba(0,0,0,0.19)',
  display: 'inline-block',
};

const overlayStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: 22,
  fontWeight: 700,
  background: 'rgba(0,0,0,0.28)',
};

const canvasWrapperStyle: React.CSSProperties = {
  position: 'relative',
};

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState<Point[]>([]);
  const [dir, setDir] = useState<Direction>('RIGHT');
  const [food, setFood] = useState<Point>(randomCell());
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const reset = useCallback(() => {
    const start: Point = { x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) };
    setSnake([start, { x: start.x - 1, y: start.y }]);
    setDir('RIGHT');
    setFood(randomCell());
    setScore(0);
    setGameOver(false);
  }, []);

  useEffect(() => {
    reset();
  }, [reset]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === ' ') {
      setRunning((r) => !r);
      return;
    }
    if (e.key.toLowerCase() === 'r') {
      reset();
      setRunning(true);
      return;
    }

    setDir((current) => {
      let next: Direction | null = null;
      if (e.key === 'ArrowUp') next = 'UP';
      if (e.key === 'ArrowDown') next = 'DOWN';
      if (e.key === 'ArrowLeft') next = 'LEFT';
      if (e.key === 'ArrowRight') next = 'RIGHT';
      if (!next) return current;
      // prevent reversing directly into yourself
      if ((current === 'UP' && next === 'DOWN') ||
          (current === 'DOWN' && next === 'UP') ||
          (current === 'LEFT' && next === 'RIGHT') ||
          (current === 'RIGHT' && next === 'LEFT')) {
        return current;
      }
      return next;
    });
  }, [reset]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => handleKey(e);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleKey]);

  // Game loop
  useEffect(() => {
    if (!running || gameOver) return;
    const id = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead = nextHead(head, dir);
        if (!withinBounds(newHead) || collides(newHead, prev)) {
          setGameOver(true);
          setRunning(false);
          return prev;
        }
        const ate = equal(newHead, food);
        const nextBody = [newHead, ...prev];
        if (!ate) nextBody.pop();
        if (ate) {
          setScore((s) => s + 1);
          // place new food avoiding snake body
          let nf = randomCell();
          let guard = 0;
          while (collides(nf, nextBody) && guard < 1000) {
            nf = randomCell();
            guard++;
          }
          setFood(nf);
        }
        return nextBody;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [dir, food, running, gameOver]);

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // background
    ctx.fillStyle = '#0f1222';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // grid (subtle)
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, CANVAS_SIZE);
      ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(CANVAS_SIZE, y * CELL_SIZE);
      ctx.stroke();
    }

    // food
    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    // snake
    snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? '#34e88b' : '#2ecc71';
      ctx.fillRect(seg.x * CELL_SIZE, seg.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });
  }, [snake, food]);

  return (
    <div style={wrapperStyle}>
      <h1 style={{ color: '#fff', marginBottom: 12 }}>Snake</h1>
      <div style={cardStyle}>
        <div style={labelStyle} aria-label="score">Score: {score}</div>
        <div style={{ height: 12 }} />
        <div style={canvasWrapperStyle}>
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            style={{ borderRadius: 8, outline: '1px solid #23263a' }}
            data-testid="snake-canvas"
          />
          {gameOver && (
            <div style={overlayStyle} data-testid="game-over">Game Over</div>
          )}
        </div>
        <div style={panelStyle}>
          <button style={buttonStyle} onClick={() => setRunning(true)} data-testid="start-btn">Start</button>
          <button style={buttonStyle} onClick={() => setRunning(false)} data-testid="pause-btn">Pause</button>
          <button style={buttonStyle} onClick={() => { reset(); setRunning(true); }} data-testid="restart-btn">Restart</button>
        </div>
        <div style={{ marginTop: 8, color: '#b8c0ff', fontSize: 12, textAlign: 'center' }}>
          Arrows: move • Space: pause • R: restart
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
