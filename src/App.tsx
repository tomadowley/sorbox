import React, { useRef, useEffect, useState } from "react";
import "./App.css";

// Crispin's character as a simple circle for now
const CRISPIN_COLOR = "#f7c948";
const CRISPIN_RADIUS = 18;

const FRACTAL_COLORS = [
  "#0e1e25", "#1b405c", "#2e7ecf", "#8dd3fc", "#fffac7", "#f7a072", "#f28482"
];

type Crispin = {
  x: number;
  y: number;
  dx: number;
  dy: number;
};

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 480;

function drawFractal(ctx: CanvasRenderingContext2D) {
  // Simple Mandelbrot Set for visual effect
  const maxIter = 40;
  const zoom = 1.3;
  const moveX = -0.7;
  const moveY = 0;
  const w = CANVAS_WIDTH, h = CANVAS_HEIGHT;

  const imgData = ctx.createImageData(w, h);
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let zx = 1.5 * (x - w / 2) / (0.5 * zoom * w) + moveX;
      let zy = (y - h / 2) / (0.5 * zoom * h) + moveY;
      let i = maxIter;
      while (zx * zx + zy * zy < 4 && i > 0) {
        let tmp = zx * zx - zy * zy + moveX;
        zy = 2.0 * zx * zy + moveY;
        zx = tmp;
        i--;
      }
      const idx = (x + y * w) * 4;
      const color = i === 0 ? [10, 30, 40] : [120 + i * 3, 120 + i * 4, 200 + i * 1]; // blueish
      imgData.data[idx] = color[0];
      imgData.data[idx + 1] = color[1];
      imgData.data[idx + 2] = color[2];
      imgData.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);
}

function drawCrispin(ctx: CanvasRenderingContext2D, crispin: Crispin) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(crispin.x, crispin.y, CRISPIN_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = CRISPIN_COLOR;
  ctx.shadowColor = "#f9d923";
  ctx.shadowBlur = 18;
  ctx.fill();
  ctx.closePath();

  // Face
  ctx.beginPath();
  ctx.arc(crispin.x, crispin.y, 12, 0, Math.PI, false);
  ctx.strokeStyle = "#362706";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();

  // Eyes
  ctx.beginPath();
  ctx.arc(crispin.x - 6, crispin.y - 6, 2.3, 0, Math.PI * 2);
  ctx.arc(crispin.x + 6, crispin.y - 6, 2.3, 0, Math.PI * 2);
  ctx.fillStyle = "#362706";
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [crispin, setCrispin] = useState<Crispin>({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    dx: 0,
    dy: 0,
  });

  // Handle keyboard input for Crispin
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      setCrispin((old) => {
        let { dx, dy } = old;
        if (e.key === "ArrowLeft" || e.key === "a") dx = -3;
        if (e.key === "ArrowRight" || e.key === "d") dx = 3;
        if (e.key === "ArrowUp" || e.key === "w") dy = -3;
        if (e.key === "ArrowDown" || e.key === "s") dy = 3;
        return { ...old, dx, dy };
      });
    }
    function handleKeyUp(e: KeyboardEvent) {
      setCrispin((old) => {
        let { dx, dy } = old;
        if (
          ["ArrowLeft", "ArrowRight", "a", "d"].includes(e.key)
        ) dx = 0;
        if (
          ["ArrowUp", "ArrowDown", "w", "s"].includes(e.key)
        ) dy = 0;
        return { ...old, dx, dy };
      });
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Game loop: move Crispin and redraw
  useEffect(() => {
    let animationId: number;

    function draw() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw fractal background
      drawFractal(ctx);

      // Move Crispin
      setCrispin((old) => {
        let nx = Math.min(
          Math.max(old.x + old.dx, CRISPIN_RADIUS),
          CANVAS_WIDTH - CRISPIN_RADIUS
        );
        let ny = Math.min(
          Math.max(old.y + old.dy, CRISPIN_RADIUS),
          CANVAS_HEIGHT - CRISPIN_RADIUS
        );
        return { ...old, x: nx, y: ny };
      });

      // Draw Crispin
      drawCrispin(ctx, crispin);

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
    // eslint-disable-next-line
  }, [crispin]);

  return (
    <div className="game-root">
      <h1 style={{ color: "#f28482", fontFamily: "cursive", textAlign: "center" }}>
        Fractal Adventure: Crispin's Quest
      </h1>
      <div style={{ textAlign: "center" }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={{
            border: "3px solid #3b3b3b",
            background: "#0e1e25",
            borderRadius: 12,
            margin: "auto"
          }}
        />
      </div>
      <div style={{ textAlign: "center", marginTop: 16, color: "#fffac7" }}>
        <strong>Controls:</strong> Arrow keys or WASD to move Crispin.<br />
        Explore the fractal world!
      </div>
    </div>
  );
}

export default App;