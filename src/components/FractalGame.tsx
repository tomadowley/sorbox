import React, { useRef, useEffect, useState, useCallback } from "react";

type Status = "playing" | "won";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 533;
const OVERSAMPLE = 2;
const INITIAL_SCALE = 3;
const MOVE_STEP = 0.4; // Multiplier for panning per arrow key
const BEST_SCORE_KEY = "fractal_best_score";

function randomInRange(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

export default function FractalGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Game state
  const [centreX, setCentreX] = useState(-0.5);
  const [centreY, setCentreY] = useState(0);
  const [scale, setScale] = useState(INITIAL_SCALE);
  const [moveCount, setMoveCount] = useState(0);
  const [status, setStatus] = useState<Status>("playing");
  const [target, setTarget] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [resetKey, setResetKey] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  // Pick target on mount/reset
  useEffect(() => {
    setCentreX(-0.5);
    setCentreY(0);
    setScale(INITIAL_SCALE);
    setMoveCount(0);
    setStatus("playing");
    setTarget({
      x: randomInRange(-2, 1),
      y: randomInRange(-1.2, 1.2),
    });
    // Get bestScore from localStorage
    const stored = localStorage.getItem(BEST_SCORE_KEY);
    setBestScore(stored ? Number(stored) : null);
    // eslint-disable-next-line
  }, [resetKey]);

  // HSV→RGB helper
  function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
    h = h % 360;
    if (h < 0) h += 360;
    s = Math.max(0, Math.min(100, s)) / 100;
    v = Math.max(0, Math.min(100, v)) / 100;
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;
    let r = 0, g = 0, b = 0;
    if (h < 60) {
      r = c; g = x; b = 0;
    } else if (h < 120) {
      r = x; g = c; b = 0;
    } else if (h < 180) {
      r = 0; g = c; b = x;
    } else if (h < 240) {
      r = 0; g = x; b = c;
    } else if (h < 300) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }
    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255),
    ];
  }

  // Draw Mandelbrot fractal with oversampling and detailed color
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Dynamic maxIter: more iterations for deeper zooms
    const maxIter = Math.min(
      1000,
      Math.round(80 + 20 * Math.log2(INITIAL_SCALE / scale))
    );

    const imgData = ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);
    const data = imgData.data;

    for (let px = 0; px < CANVAS_WIDTH; px++) {
      for (let py = 0; py < CANVAS_HEIGHT; py++) {
        let rSum = 0, gSum = 0, bSum = 0;

        for (let subX = 0; subX < OVERSAMPLE; subX++) {
          for (let subY = 0; subY < OVERSAMPLE; subY++) {
            // Subpixel sample, map to complex plane
            const x0 =
              centreX +
              (scale *
                (px +
                  (subX + 0.5) / OVERSAMPLE -
                  CANVAS_WIDTH / 2)) /
                CANVAS_HEIGHT;
            const y0 =
              centreY +
              (scale *
                (py +
                  (subY + 0.5) / OVERSAMPLE -
                  CANVAS_HEIGHT / 2)) /
                CANVAS_HEIGHT;

            let x = 0, y = 0;
            let iter = 0;
            while (x * x + y * y <= 4 && iter < maxIter) {
              const xtemp = x * x - y * y + x0;
              y = 2 * x * y + y0;
              x = xtemp;
              iter++;
            }
            // Smooth coloring
            let norm = iter;
            if (iter < maxIter) {
              const log_zn = Math.log(x * x + y * y) / 2;
              const nu = Math.log(log_zn / Math.log(2)) / Math.log(2);
              norm = iter + 1 - nu;
            }
            // Rich cyclic palette
            let color: [number, number, number];
            if (iter === maxIter) {
              color = [10, 10, 16]; // near-black interior
            } else {
              const t = norm / maxIter;
              const hue = 720 * t; // cycles twice around wheel
              const sat = 100;
              const val = 80;
              color = hsvToRgb(hue, sat, val);
            }
            rSum += color[0];
            gSum += color[1];
            bSum += color[2];
          }
        }

        const samples = OVERSAMPLE * OVERSAMPLE;
        const idx = 4 * (py * CANVAS_WIDTH + px);
        data[idx + 0] = Math.round(rSum / samples);
        data[idx + 1] = Math.round(gSum / samples);
        data[idx + 2] = Math.round(bSum / samples);
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }, [centreX, centreY, scale, resetKey]);

  // Handle zoom in/out and increment moves
  function handleCanvasClick(e: React.MouseEvent) {
    if (status !== "playing") return;

    // Detect right-click or ctrl/cmd/shift-click for zoom out
    const isZoomOut =
      e.type === "contextmenu" ||
      e.button === 2 ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey;

    e.preventDefault?.();

    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Convert pixel to complex plane
    const newX =
      centreX +
      (scale * (clickX - CANVAS_WIDTH / 2)) / CANVAS_HEIGHT;
    const newY =
      centreY +
      (scale * (clickY - CANVAS_HEIGHT / 2)) / CANVAS_HEIGHT;

    let newScale = scale;
    if (isZoomOut) {
      newScale = Math.min(INITIAL_SCALE, scale * 2);
    } else {
      newScale = scale * 0.5;
    }

    // Don't allow zooming out past INITIAL_SCALE
    if (newScale > INITIAL_SCALE) newScale = INITIAL_SCALE;

    // Win condition: only check if zooming in (tighter box)
    const d = distance(newX, newY, target.x, target.y);
    const tolerance = newScale * 0.05;

    if (!isZoomOut && d < tolerance) {
      setCentreX(newX);
      setCentreY(newY);
      setScale(newScale);
      setMoveCount((mc) => {
        const nextMove = mc + 1;
        // Update bestScore if needed
        if (status === "playing") {
          if (bestScore == null || nextMove < bestScore) {
            localStorage.setItem(BEST_SCORE_KEY, String(nextMove));
            setBestScore(nextMove);
          }
        }
        return nextMove;
      });
      setStatus("won");
      return;
    }

    // Continue playing
    setCentreX(newX);
    setCentreY(newY);
    setScale(newScale);
    setMoveCount((mc) => mc + 1);
  }

  function handleRestart() {
    setResetKey((k) => k + 1);
  }

  // --- Panning logic (arrow keys) ---
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (status !== "playing") return;
      let dx = 0, dy = 0;
      if (e.key === "ArrowLeft") dx = -MOVE_STEP;
      else if (e.key === "ArrowRight") dx = MOVE_STEP;
      else if (e.key === "ArrowUp") dy = -MOVE_STEP;
      else if (e.key === "ArrowDown") dy = MOVE_STEP;
      if (dx !== 0 || dy !== 0) {
        e.preventDefault();
        setCentreX((x) => x + dx * scale);
        setCentreY((y) => y + dy * scale);
        setMoveCount((mc) => mc + 1);
      }
    },
    [scale, status]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  // Overlay styles
  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    pointerEvents: "none",
    color: "white",
    fontFamily: "inherit",
    fontWeight: 500,
    textShadow: "0 1px 8px #222,0 1px 0 #111",
    zIndex: 2,
  };

  const instructionsStyle: React.CSSProperties = {
    background: "rgba(24,24,32,0.7)",
    borderRadius: "6px",
    padding: "12px 18px",
    margin: "22px auto 0 auto",
    maxWidth: 480,
    fontSize: 18,
    pointerEvents: "auto",
    textAlign: "center",
  };

  const movesStyle: React.CSSProperties = {
    alignSelf: "flex-end",
    background: "rgba(24,24,32,0.7)",
    borderRadius: "0 0 0 8px",
    padding: "8px 16px",
    margin: "0",
    fontSize: 17,
    pointerEvents: "auto",
    marginTop: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  };

  const buttonStyle: React.CSSProperties = {
    background: "linear-gradient(90deg,#6638a3,#2a82d7)",
    border: "none",
    color: "white",
    fontWeight: 700,
    fontSize: 20,
    padding: "12px 32px",
    borderRadius: 8,
    margin: "30px auto 0 auto",
    cursor: "pointer",
    boxShadow: "0 2px 8px #0004",
    pointerEvents: "auto",
    transition: "background 0.18s",
    display: "block",
  };

  const statusMessage =
    status === "won"
      ? "🎉 Congrats, Crispin! You found the fractal treasure!"
      : "";

  // --- Directional clue logic ---
  let clue: string | null = null;
  if (status === "playing") {
    const dx = target.x - centreX;
    const dy = target.y - centreY;
    const threshold = scale * 0.15;
    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) {
      clue = "Very close!";
    } else {
      let horiz = "";
      let vert = "";
      if (dx > threshold) horiz = "right";
      else if (dx < -threshold) horiz = "left";
      if (dy > threshold) vert = "down";
      else if (dy < -threshold) vert = "up";
      if (horiz && vert) clue = vert + "-" + horiz;
      else clue = vert || horiz || null;
    }
  }
  // --- End directional clue logic ---

  // --- Attach contextmenu for right-click (zoom out) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    function onCtx(e: MouseEvent) {
      if (status !== "playing") return;
      // Only handle right-click if over the canvas
      handleCanvasClick(
        {
          ...e,
          preventDefault: () => e.preventDefault(),
          button: 2,
          type: "contextmenu",
          nativeEvent: e,
        } as any
      );
    }
    canvas.addEventListener("contextmenu", onCtx);
    return () => canvas.removeEventListener("contextmenu", onCtx);
  }, [centreX, centreY, scale, status, handleCanvasClick]);

  return (
    <div style={{ position: "relative", width: CANVAS_WIDTH, height: CANVAS_HEIGHT, margin: "0 auto", paddingBottom: 120 }}>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onClick={handleCanvasClick}
        onAuxClick={e => {
          // Support zoom out on middle-click too
          if (e.button === 1) {
            handleCanvasClick({ ...e, button: 2, type: "contextmenu" } as any);
          }
        }}
        style={{
          borderRadius: 6,
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          boxShadow: "0 2px 18px #2226",
          background: "#181820",
          cursor: status === "playing" ? "zoom-in" : "default",
          display: "block",
        }}
      />
      <div style={overlayStyle}>
        {/* Directional Clue Overlay */}
        {status === "playing" && clue && (
          <div
            style={{
              fontSize: 20,
              marginTop: 6,
              color: "#ffda79",
              textShadow: "0 0 7px #ffda79, 0 2px 8px #222,0 1px 0 #111",
              textAlign: "center",
              alignSelf: "center",
              pointerEvents: "none",
              letterSpacing: 0.3,
              fontFamily: "inherit",
              fontWeight: 700,
              zIndex: 3,
              background: "rgba(32,21,0,0.38)",
              padding: "3px 20px",
              borderRadius: 7,
              minWidth: 110,
              maxWidth: 320,
              boxShadow: "0 0 8px #ffda7955",
            }}
          >
            {clue}
          </div>
        )}

        {/* Instructions Overlay */}
        {status === "playing" && moveCount === 0 && (
          <div style={instructionsStyle}>
            <span>
              <b>Crispin</b>, can you find the hidden fractal treasure?
              <br />
              <b>Zoom in</b>: Left click the fractal to recenter and zoom in.<br />
              <b>Zoom out</b>: Right click, or Ctrl/Cmd/Shift+click, to recenter and zoom out (cannot zoom out beyond start).<br />
              <b>Pan</b>: Use arrow keys to move your view.<br />
              Each action counts as a move. Find the treasure in as few moves as possible!
            </span>
          </div>
        )}
        {/* Status + Restart */}
        {status === "won" && (
          <div style={instructionsStyle}>
            <span style={{ fontSize: 22, fontWeight: 700 }}>{statusMessage}</span>
            <br />
            <button style={buttonStyle} onClick={handleRestart}>
              Restart
            </button>
          </div>
        )}

        {/* Moves and Best Score HUD */}
        <div style={movesStyle}>
          <span>
            Moves: <b>{moveCount}</b>
          </span>
          {bestScore !== null && (
            <span style={{ marginLeft: 12, opacity: 0.83 }}>
              Best: <b>{bestScore}</b>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}