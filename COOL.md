# Something cool: Ulam Prime Spiral (math art)

A zero-dependency interactive visualization that plots the Ulam prime spiral on a full-screen canvas.

Why this is cool:
- Beautiful emergent patterns from simple math
- No build changes; lives under `public/` and is auto-served by most React/TS setups
- Tunable: number of points, step size, instant vs animated, custom colors

How to use
- Start your dev server (typically):
  - `npm start` or `yarn start`
- Open the demo directly:
  - http://localhost:3000/cool/ulam-spiral.html

If you serve the project via another static server, the file path is:
- `public/cool/ulam-spiral.html`

Notes
- The page is standalone HTML/JS/CSS with no external libraries.
- It does not touch the existing TypeScript/React code or build configuration.
- Prime testing uses a fast-enough trial division for the intended point counts.
