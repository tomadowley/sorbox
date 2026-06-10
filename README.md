# Neon Labyrinth

Neon Labyrinth is an original browser-based retro first-person shooter built with React and an HTML canvas raycaster. It uses familiar early-3D arcade inspirations, but all game code, map layout, entities, and presentation are original to this project; it is not a Doom clone, Doom copy, or reuse of Doom assets.

## Setup

Install dependencies:

```sh
npm install
```

Run the development server:

```sh
npm start
```

Open the local URL printed by Create React App, then click the canvas or press Tab to focus it before playing.

## Controls

- `W` / `S` or `↑` / `↓`: move forward and backward
- `A` / `D`: strafe left and right
- `Q` / `E` or `←` / `→`: turn
- `Space` or mouse click: fire
- `F` or `Enter`: interact with doors
- `R`: restart after victory or defeat

## Features

- Canvas raycasting renderer with textured-feeling neon wall, floor, ceiling, sprite, weapon, and HUD drawing.
- Grid-map collision for walls, doors, pickups, enemies, and the exit portal.
- Enemy sentry drones that patrol, chase, damage the player, and can be defeated.
- Pickups for health, ammunition, armor, and the Access Shard key.
- Locked door and portal flow requiring the key before victory.
- HUD with health, armor, ammo, key, enemy count, and contextual feedback.
- Intro, active play, victory, death, and restart states.

## Test and build

Run the automated tests:

```sh
npm test -- --watchAll=false
```

Create a production build:

```sh
npm run build
```
