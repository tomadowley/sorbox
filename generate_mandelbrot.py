#!/usr/bin/env python3
"""
Generate a Mandelbrot set image (PPM format) using only the Python standard library.

Usage:
  python generate_mandelbrot.py --width 1600 --height 1000 --max-iter 500 --zoom 1.5 --center -0.75 0.0 --output out/mandelbrot.ppm

PPM is widely supported by image viewers and trivial to write. No external dependencies required.
"""
from __future__ import annotations

import argparse
import math
import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Viewport:
    cx: float  # center x (real)
    cy: float  # center y (imag)
    scale: float  # width of view in complex plane at zoom=1.0


def mandelbrot_escape_iterations(c: complex, max_iter: int) -> int:
    z = 0j
    for i in range(max_iter):
        # z <- z^2 + c
        z = z * z + c
        if (z.real * z.real + z.imag * z.imag) > 4.0:  # |z|^2 > 4 escapes
            return i
    return max_iter


def smooth_color(iter_count: int, max_iter: int, z: complex) -> float:
    """Compute a smooth iteration count for nice coloring.

    Uses continuous (log-based) smoothing. If the point is inside the set
    (i.e., didn't escape), return max_iter.
    """
    if iter_count >= max_iter:
        return float(max_iter)
    # Continuous potential
    mod_sq = z.real * z.real + z.imag * z.imag
    if mod_sq <= 0:
        return float(iter_count)
    return iter_count + 1 - math.log(math.log(math.sqrt(mod_sq), 2), 2)


def palette(t: float) -> tuple[int, int, int]:
    """A pleasant cyclic palette using sine waves in 0..1 -> RGB 0..255."""
    # t is normalized 0..1
    r = int(255 * (0.5 + 0.5 * math.sin(2 * math.pi * (t + 0.0))))
    g = int(255 * (0.5 + 0.5 * math.sin(2 * math.pi * (t + 1/3))))
    b = int(255 * (0.5 + 0.5 * math.sin(2 * math.pi * (t + 2/3))))
    return r, g, b


def render(width: int, height: int, viewport: Viewport, max_iter: int) -> list[tuple[int, int, int]]:
    aspect = width / height
    # Viewport width in complex plane scaled by zoom factor
    view_w = viewport.scale
    view_h = view_w / aspect

    x0 = viewport.cx - view_w / 2
    y0 = viewport.cy - view_h / 2

    pixels: list[tuple[int, int, int]] = []
    for j in range(height):
        y = y0 + (j / (height - 1)) * view_h
        for i in range(width):
            x = x0 + (i / (width - 1)) * view_w
            c = complex(x, y)
            z = 0j
            escaped_at = max_iter
            for it in range(max_iter):
                z = z * z + c
                if (z.real * z.real + z.imag * z.imag) > 4.0:
                    escaped_at = it
                    break
            s = smooth_color(escaped_at, max_iter, z)
            t = (s % max_iter) / max_iter
            pixels.append(palette(t))
    return pixels


def write_ppm(path: str, width: int, height: int, pixels: list[tuple[int, int, int]]) -> None:
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with open(path, "wb") as f:
        header = f"P6\n{width} {height}\n255\n".encode("ascii")
        f.write(header)
        # Flatten RGB tuples
        data = bytearray()
        for r, g, b in pixels:
            data.extend((r & 0xFF, g & 0xFF, b & 0xFF))
        f.write(data)


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Render a Mandelbrot set image to PPM (no deps).")
    p.add_argument("--width", type=int, default=1200)
    p.add_argument("--height", type=int, default=800)
    p.add_argument("--max-iter", type=int, default=500)
    p.add_argument("--zoom", type=float, default=1.0, help="Zoom factor (smaller values zoom in)")
    p.add_argument("--center", type=float, nargs=2, default=[-0.75, 0.0], metavar=("CX", "CY"))
    p.add_argument("--output", type=str, default="out/mandelbrot.ppm")
    return p.parse_args()


def main() -> None:
    args = parse_args()
    # scale is the width of the view in complex plane; smaller => more zoom
    base_scale = 3.5  # covers from -2.5..1 on real axis by default
    scale = base_scale / max(args.zoom, 1e-12)
    viewport = Viewport(cx=float(args.center[0]), cy=float(args.center[1]), scale=scale)

    pixels = render(args.width, args.height, viewport, args.max_iter)
    write_ppm(args.output, args.width, args.height, pixels)


if __name__ == "__main__":
    main()
