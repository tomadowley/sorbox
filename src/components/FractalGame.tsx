import React, { useRef, useEffect, useState } from "react";

type Status = "playing" | "won" | "lost";

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const INITIAL_SCALE = 3;
const MAX_ZOOMS = 12;

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
  const [zoomCount, setZoomCount] = useState(0);
  const [status, setStatus] = useState<Status>("playing");
  const [target, setTarget] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [resetKey, setResetKey] = useState(0);

  // Pick target on mount/reset
  useEffect(() => {
    setCentreX(-0.5);
    setCentreY(0);
    setScale(INITIAL_SCALE);
    setZoomCount(0);
    setStatus("playing");
    setTarget({
      x: randomInRange(-2, 1),
      y: randomInRange(-1.2, 1.2),
    });
    // eslint-disable-next-line
  }, [resetKey]);

  // Draw Mandelbrot fractal
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Fractal params
    const maxIter = 60;

    const imgData = ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);
    const data = imgData.data;

    for (let px = 0; px &lt; CANVAS_WIDTH; px++) {
      for (let py = 0; py &lt; CANVAS_HEIGHT; py++) {
        // Map to complex plane
        const x0 =
          centreX + (scale * (px - CANVAS_WIDTH / 2)) / CANVAS_HEIGHT;
        const y0 =
          centreY + (scale * (py - CANVAS_HEIGHT / 2)) / CANVAS_HEIGHT;

        let x = 0,
          y = 0;
        let iter = 0;
        while (x * x + y * y &lt;= 4 && iter &lt; maxIter) {
          const xtemp = x * x - y * y + x0;
          y = 2 * x * y + y0;
          x = xtemp;
          iter++;
        }
        // Smooth coloring
        let norm = iter;
        if (iter &lt; maxIter) {
          // log(log) smoothing
          const log_zn = Math.log(x * x + y * y) / 2;
          const nu = Math.log(log_zn / Math.log(2)) / Math.log(2);
          norm = iter + 1 - nu;
        }
        // Color mapping: purple-blue-gold
        const color =
          iter === maxIter
            ? [32, 5, 48]
            : [
                50 + Math.floor(120 * Math.sin(0.15 * norm)),
                70 + Math.floor(120 * Math.sin(0.08 * norm + 2)),
                120 + Math.floor(80 * Math.sin(0.1 * norm + 4)),
              ];
        const idx = 4 * (py * CANVAS_WIDTH + px);
        data[idx + 0] = color[0];
        data[idx + 1] = color[1];
        data[idx + 2] = color[2];
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }, [centreX, centreY, scale, resetKey]);

  // Handle click to zoom
  function handleCanvasClick(e: React.MouseEvent) {
    if (status !== "playing") return;

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

    // Zoom in
    const newScale = scale * 0.5;
    const newZoom = zoomCount + 1;

    // Win condition
    const d = distance(newX, newY, target.x, target.y);
    const tolerance = newScale * 0.05;

    if (d &lt; tolerance) {
      setCentreX(newX);
      setCentreY(newY);
      setScale(newScale);
      setZoomCount(newZoom);
      setStatus("won");
      return;
    }

    if (newZoom === MAX_ZOOMS) {
      setCentreX(newX);
      setCentreY(newY);
      setScale(newScale);
      setZoomCount(newZoom);
      setStatus("lost");
      return;
    }

    // Continue playing
    setCentreX(newX);
    setCentreY(newY);
    setScale(newScale);
    setZoomCount(newZoom);
  }

  function handleRestart() {
    setResetKey((k) => k + 1);
  }

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
    maxWidth: 440,
    fontSize: 18,
    pointerEvents: "auto",
    textAlign: "center",
  };

  const zoomStyle: React.CSSProperties = {
    alignSelf: "flex-end",
    background: "rgba(24,24,32,0.7)",
    borderRadius: "0 0 0 8px",
    padding: "8px 16px",
    margin: "0",
    fontSize: 17,
    pointerEvents: "auto",
    marginTop: "auto",
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
      : status === "lost"
      ? "Game over, Crispin. Try again!"
      : "";

  return (
    <div style={{ position: "relative", width: CANVAS_WIDTH, height: CANVAS_HEIGHT, margin: "0 auto" }}>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onClick={handleCanvasClick}
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
        <div style={instructionsStyle}>
          {status === "playing" && (
            <>
              <span>
                <b>Crispin</b>, can you find the hidden fractal treasure?
                <br />
                Click anywhere to zoom in. Each zoom halves your view and recenters on your click.
                <br />
                You have <b>{MAX_ZOOMS}</b> zooms. Good luck!
              </span>
            </>
          )}
          {status !== "playing" && (
            <>
              <span style={{ fontSize: 22, fontWeight: 700 }}>{statusMessage}</span>
              <br />
              <button style={buttonStyle} onClick={handleRestart}>
                Restart
              </button>
            </>
          )}
        </div>
        <div style={zoomStyle}>
          Zooms left: <b>{MAX_ZOOMS - zoomCount}</b> / {MAX_ZOOMS}
        </div>
      </div>
    </div>
  );
}