import React, { useRef, useEffect, useState } from "react";

type Status = "playing" | "won" | "lost";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 533;
const OVERSAMPLE = 2;
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

    if (d < tolerance) {
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