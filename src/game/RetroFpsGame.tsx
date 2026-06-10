import React, { useRef, useEffect, useCallback } from 'react';

// Constants
const W = 960;
const H = 540;
const HALF_H = H / 2;
const FOV = Math.PI / 3;
const HALF_FOV = FOV / 2;
const NUM_RAYS = W;
const MAX_DEPTH = 20;
const MOVE_SPEED = 3.5;
const ROT_SPEED = 2.0;
const PICKUP_RADIUS = 0.55;
const INTERACT_DIST = 1.8;
const ENEMY_SPEED = 1.5;
const ENEMY_ATTACK_RANGE = 1.1;
const ENEMY_SIGHT_RANGE = 9;
const ENEMY_ATTACK_INTERVAL = 1.2;
const ENEMY_DAMAGE = 12;
const WEAPON_COOLDOWN = 0.35;
const WEAPON_DAMAGE = 30;
const MUZZLE_FLASH_DUR = 0.12;
const HUD_H = 80;
const IMPACT_EXPLOSION_DURATION = 0.35;
const DEATH_EXPLOSION_DURATION = 0.8;
const DOOR_EXPLOSION_DURATION = 0.55;
const DEATH_BLAST_RADIUS = 1.7;
const DEATH_BLAST_DAMAGE = 25;

// Map
// Legend: # wall  . floor  D door  L locked-door  E exit-portal
//         K key/access-shard  H med-pack  A energy-cells  M enemy(sentry)
//         P player-spawn
const MAP_SRC = [
  '####################',
  '#P..........#......#',
  '#...####....#..M...#',
  '#...#....D..#......#',
  '#...#..#####.......#',
  '#...#..#.....#######',
  '#...####.A...#....##',
  '#............#.M..##',
  '###.##########....##',
  '#....H.......D....##',
  '#.M..........#....##',
  '#............#L...##',
  '####.#######.#....##',
  '#..K.......#......##',
  '#....M.....#..M...##',
  '#..........#########',
  '##########.........#',
  '#.......A..........#',
  '#.....M...#.......##',
  '#.........#....E...#',
  '####################',
];

const MAP_ROWS = MAP_SRC.length;
const MAP_COLS = MAP_SRC[0].length;

// Types
type GamePhase = 'intro' | 'playing' | 'dead' | 'victory';

interface Door {
  row: number;
  col: number;
  locked: boolean;
  open: boolean;
  /** 0=closed 1=fully-open */
  openAmount: number;
}

interface Pickup {
  id: number;
  row: number;
  col: number;
  x: number;
  y: number;
  kind: 'health' | 'ammo' | 'key' | 'armor';
  collected: boolean;
}

interface Enemy {
  id: number;
  x: number;
  y: number;
  health: number;
  maxHealth: number;
  state: 'idle' | 'chase' | 'attack' | 'dead';
  attackTimer: number;
  hitFlash: number;
}

interface Explosion {
  id: number;
  x: number;
  y: number;
  age: number;
  duration: number;
  radius: number;
  kind: 'impact' | 'death' | 'door' | 'player';
}

interface Player {
  x: number;
  y: number;
  angle: number;
  health: number;
  armor: number;
  ammo: number;
  score: number;
  hasKey: boolean;
}

interface GameState {
  phase: GamePhase;
  player: Player;
  doors: Door[];
  pickups: Pickup[];
  enemies: Enemy[];
  explosions: Explosion[];
  wallMap: number[][];   // 0=floor 1=wall 2=door 3=locked 4=exit
  weaponCooldown: number;
  muzzleFlash: number;
  noAmmoFlash: number;
  noKeyFlash: number;
  feedbackMsg: string;
  feedbackTimer: number;
  lastTime: number;
  nextExplosionId: number;
}

// Initialisation
function buildInitialState(): GameState {
  const wallMap: number[][] = [];
  const doors: Door[] = [];
  const pickups: Pickup[] = [];
  const enemies: Enemy[] = [];
  let player: Player = { x: 1.5, y: 1.5, angle: 0, health: 100, armor: 0, ammo: 30, score: 0, hasKey: false };
  let pickupId = 0;
  let enemyId = 0;

  for (let r = 0; r < MAP_ROWS; r++) {
    const row: number[] = [];
    const src = MAP_SRC[r] ?? '';
    for (let c = 0; c < MAP_COLS; c++) {
      const ch = src[c] ?? '#';
      switch (ch) {
        case '#': row.push(1); break;
        case 'D': row.push(2); doors.push({ row: r, col: c, locked: false, open: false, openAmount: 0 }); break;
        case 'L': row.push(3); doors.push({ row: r, col: c, locked: true,  open: false, openAmount: 0 }); break;
        case 'E': row.push(4); break;
        case 'P': row.push(0); player = { ...player, x: c + 0.5, y: r + 0.5 }; break;
        case 'K': row.push(0); pickups.push({ id: pickupId++, row: r, col: c, x: c + 0.5, y: r + 0.5, kind: 'key',    collected: false }); break;
        case 'H': row.push(0); pickups.push({ id: pickupId++, row: r, col: c, x: c + 0.5, y: r + 0.5, kind: 'health', collected: false }); break;
        case 'A': row.push(0); pickups.push({ id: pickupId++, row: r, col: c, x: c + 0.5, y: r + 0.5, kind: 'ammo',   collected: false }); break;
        case 'M': row.push(0); enemies.push({ id: enemyId++, x: c + 0.5, y: r + 0.5, health: 80, maxHealth: 80, state: 'idle', attackTimer: 0, hitFlash: 0 }); break;
        default:  row.push(0); break;
      }
    }
    wallMap.push(row);
  }

  return {
    phase: 'intro',
    player,
    doors,
    pickups,
    enemies,
    explosions: [],
    wallMap,
    weaponCooldown: 0,
    muzzleFlash: 0,
    noAmmoFlash: 0,
    noKeyFlash: 0,
    feedbackMsg: '',
    feedbackTimer: 0,
    lastTime: 0,
    nextExplosionId: 0,
  };
}

// Helpers
function isSolid(gs: GameState, cx: number, cy: number): boolean {
  const col = Math.floor(cx);
  const row = Math.floor(cy);
  if (row < 0 || row >= MAP_ROWS || col < 0 || col >= MAP_COLS) return true;
  const cell = gs.wallMap[row]?.[col] ?? 1;
  if (cell === 1) return true;
  if (cell === 2 || cell === 3) {
    const door = gs.doors.find(d => d.row === row && d.col === col);
    return door ? door.openAmount < 0.5 : true;
  }
  return false;
}

function movePlayer(gs: GameState, dx: number, dy: number): void {
  const margin = 0.25;
  const nx = gs.player.x + dx;
  const ny = gs.player.y + dy;
  if (!isSolid(gs, nx, gs.player.y + (dy > 0 ? margin : -margin)) &&
      !isSolid(gs, nx, gs.player.y + (dy > 0 ? -margin : margin))) {
    gs.player.x = nx;
  }
  if (!isSolid(gs, gs.player.x + (dx > 0 ? margin : -margin), ny) &&
      !isSolid(gs, gs.player.x + (dx > 0 ? -margin : margin), ny)) {
    gs.player.y = ny;
  }
}

function dist2(ax: number, ay: number, bx: number, by: number): number {
  return (ax - bx) ** 2 + (ay - by) ** 2;
}

function spawnExplosion(
  gs: GameState,
  x: number,
  y: number,
  kind: Explosion['kind'],
  radius: number,
  duration: number
): void {
  gs.explosions.push({
    id: gs.nextExplosionId++,
    x,
    y,
    kind,
    radius,
    duration,
    age: 0,
  });
}

function hasLOS(gs: GameState, ax: number, ay: number, bx: number, by: number): boolean {
  const steps = 30;
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    const cx = ax + (bx - ax) * t;
    const cy = ay + (by - ay) * t;
    const col = Math.floor(cx);
    const row = Math.floor(cy);
    const cell = gs.wallMap[row]?.[col] ?? 1;
    if (cell === 1) return false;
    if ((cell === 2 || cell === 3)) {
      const door = gs.doors.find(d => d.row === row && d.col === col);
      if (!door || door.openAmount < 0.5) return false;
    }
  }
  return true;
}

function castRay(gs: GameState, originX: number, originY: number, angle: number): {
  dist: number; cell: number; side: number;
} {
  const rayDirX = Math.cos(angle);
  const rayDirY = Math.sin(angle);
  let mapX = Math.floor(originX);
  let mapY = Math.floor(originY);
  const deltaDistX = rayDirX === 0 ? 1e30 : Math.abs(1 / rayDirX);
  const deltaDistY = rayDirY === 0 ? 1e30 : Math.abs(1 / rayDirY);
  let stepX: number;
  let stepY: number;
  let sideDistX: number;
  let sideDistY: number;
  if (rayDirX < 0) { stepX = -1; sideDistX = (originX - mapX) * deltaDistX; }
  else              { stepX =  1; sideDistX = (mapX + 1 - originX) * deltaDistX; }
  if (rayDirY < 0) { stepY = -1; sideDistY = (originY - mapY) * deltaDistY; }
  else              { stepY =  1; sideDistY = (mapY + 1 - originY) * deltaDistY; }
  let side = 0;
  let hit = false;
  let depth = 0;
  while (!hit && depth < MAX_DEPTH) {
    if (sideDistX < sideDistY) { sideDistX += deltaDistX; mapX += stepX; side = 0; }
    else                        { sideDistY += deltaDistY; mapY += stepY; side = 1; }
    const cell = gs.wallMap[mapY]?.[mapX] ?? 1;
    if (cell === 1 || cell === 4) { hit = true; }
    else if (cell === 2 || cell === 3) {
      const doorRow = mapY;
      const doorCol = mapX;
      const door = gs.doors.find(d => d.row === doorRow && d.col === doorCol);
      if (!door || door.openAmount < 0.5) { hit = true; }
    }
    depth++;
  }
  const perpWallDist = side === 0
    ? (sideDistX - deltaDistX)
    : (sideDistY - deltaDistY);
  const cell = gs.wallMap[mapY]?.[mapX] ?? 1;
  return { dist: Math.max(0.01, perpWallDist), cell, side };
}

// Renderer
function render(ctx: CanvasRenderingContext2D, gs: GameState): void {
  // sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, HALF_H - HUD_H / 2);
  skyGrad.addColorStop(0, '#050010');
  skyGrad.addColorStop(1, '#1a006e');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, HALF_H - HUD_H / 2);

  // floor
  const floorGrad = ctx.createLinearGradient(0, HALF_H - HUD_H / 2, 0, H - HUD_H);
  floorGrad.addColorStop(0, '#0d0d0d');
  floorGrad.addColorStop(1, '#000000');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, HALF_H - HUD_H / 2, W, H - HUD_H - (HALF_H - HUD_H / 2));

  const { x, y, angle } = gs.player;
  const zBuffer: number[] = new Array(W).fill(0);

  for (let col = 0; col < NUM_RAYS; col++) {
    const rayAngle = angle - HALF_FOV + (col / NUM_RAYS) * FOV;
    const { dist, cell, side } = castRay(gs, x, y, rayAngle);
    zBuffer[col] = dist;

    const lineH = Math.min((H / dist) | 0, H);
    const drawStart = ((H - HUD_H) / 2 - lineH / 2) | 0;
    const drawEnd = drawStart + lineH;

    // wall colour by type and distance shading
    let baseR = 0; let baseG = 0; let baseB = 0;
    if (cell === 4) { baseR = 0; baseG = 220; baseB = 180; }       // exit portal cyan
    else if (cell === 3) { baseR = 180; baseG = 50; baseB = 0; }   // locked door red
    else if (cell === 2) { baseR = 120; baseG = 90; baseB = 20; }  // door brown
    else { baseR = 40; baseG = 20; baseB = 80; }                   // wall purple

    const shade = Math.min(1, 1 / (dist * 0.3 + 0.4));
    const sideDim = side === 1 ? 0.6 : 1.0;
    const r = (baseR * shade * sideDim) | 0;
    const g = (baseG * shade * sideDim) | 0;
    const b = (baseB * shade * sideDim) | 0;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(col, drawStart, 1, drawEnd - drawStart);
  }

  // Sprites: pickups and enemies
  type SpriteEntry = { dx: number; dy: number; distSq: number; kind: string; data: Pickup | Enemy };
  const sprites: SpriteEntry[] = [];
  for (const p of gs.pickups) {
    if (!p.collected) sprites.push({ dx: p.x - x, dy: p.y - y, distSq: dist2(p.x, p.y, x, y), kind: 'pickup', data: p });
  }
  for (const e of gs.enemies) {
    if (e.state !== 'dead') sprites.push({ dx: e.x - x, dy: e.y - y, distSq: dist2(e.x, e.y, x, y), kind: 'enemy', data: e });
  }
  sprites.sort((a, b) => b.distSq - a.distSq);

  const viewH = H - HUD_H;

  for (const sp of sprites) {
    const spriteAngle = Math.atan2(sp.dy, sp.dx) - angle;
    const normalised = Math.atan2(Math.sin(spriteAngle), Math.cos(spriteAngle));
    if (Math.abs(normalised) > HALF_FOV + 0.1) continue;
    const spriteDist = Math.sqrt(sp.distSq);
    if (spriteDist < 0.3) continue;

    const screenX = (0.5 + normalised / FOV) * W;
    const spriteScreenH = Math.min((viewH / spriteDist) | 0, viewH);
    const spriteScreenW = spriteScreenH;
    const drawStartY = ((viewH / 2) - spriteScreenH / 2) | 0;
    const drawStartX = (screenX - spriteScreenW / 2) | 0;

    const isPickup = sp.kind === 'pickup';
    const isEnemy  = sp.kind === 'enemy';

    for (let sx = 0; sx < spriteScreenW; sx++) {
      const screenCol = drawStartX + sx;
      if (screenCol < 0 || screenCol >= W) continue;
      if ((zBuffer[screenCol] ?? 0) < spriteDist) continue;

      if (isPickup) {
        const pu = sp.data as Pickup;
        let clr = '#00ff88';
        if (pu.kind === 'health') clr = '#ff4444';
        else if (pu.kind === 'ammo')  clr = '#ffcc00';
        else if (pu.kind === 'key')   clr = '#00ccff';
        else if (pu.kind === 'armor') clr = '#8888ff';
        const tx = sx / spriteScreenW;
        const ty_center = 0.5;
        const inCircle = (tx - 0.5) ** 2 + (ty_center - 0.5) ** 2 < 0.2;
        if (inCircle) {
          ctx.fillStyle = clr;
          ctx.fillRect(screenCol, drawStartY + (spriteScreenH * 0.25) | 0, 1, (spriteScreenH * 0.5) | 0);
        }
      } else if (isEnemy) {
        const en = sp.data as Enemy;
        const tx = sx / spriteScreenW;
        // simple humanoid silhouette
        let rowStart = drawStartY;
        let rowEnd   = drawStartY + spriteScreenH;
        const headTop    = rowStart + (spriteScreenH * 0.05) | 0;
        const headBot    = rowStart + (spriteScreenH * 0.30) | 0;
        const bodyTop    = headBot;
        const bodyBot    = rowStart + (spriteScreenH * 0.75) | 0;
        const legBot     = rowEnd;
        const headL = 0.35; const headR = 0.65;
        const bodyL = 0.30; const bodyR = 0.70;
        const legL  = 0.38; const legR  = 0.62;
        const flash = en.hitFlash > 0;
        const bodyClr = flash ? '#ffffff' : '#ff6600';
        const headClr = flash ? '#ffffff' : '#ffaa00';
        void rowStart; void rowEnd; void legBot;
        if (tx >= headL && tx <= headR) {
          ctx.fillStyle = headClr;
          ctx.fillRect(screenCol, headTop, 1, headBot - headTop);
        } else if (tx >= bodyL && tx <= bodyR) {
          ctx.fillStyle = bodyClr;
          ctx.fillRect(screenCol, bodyTop, 1, bodyBot - bodyTop);
        } else if (tx >= legL && tx <= legR) {
          ctx.fillStyle = bodyClr;
          ctx.fillRect(screenCol, bodyBot, 1, spriteScreenH * 0.25 | 0);
        }
        // health bar above sprite
        const hpFrac = en.health / en.maxHealth;
        const barW = spriteScreenW;
        const barX = drawStartX;
        const barY = drawStartY - 8;
        if (barY > 0) {
          ctx.fillStyle = '#333';
          ctx.fillRect(barX, barY, barW, 5);
          ctx.fillStyle = hpFrac > 0.5 ? '#00ff44' : hpFrac > 0.25 ? '#ffcc00' : '#ff2200';
          ctx.fillRect(barX, barY, (barW * hpFrac) | 0, 5);
        }
      }
    }
  }

  for (const explosion of gs.explosions) {
    const dx = explosion.x - x;
    const dy = explosion.y - y;
    const spriteAngle = Math.atan2(dy, dx) - angle;
    const normalised = Math.atan2(Math.sin(spriteAngle), Math.cos(spriteAngle));
    if (Math.abs(normalised) > HALF_FOV + 0.25) continue;

    const explosionDist = Math.sqrt(dx * dx + dy * dy);
    if (explosionDist < 0.2) continue;

    const screenX = (0.5 + normalised / FOV) * W;
    const progress = Math.min(1, explosion.age / explosion.duration);
    const fade = 1 - progress;
    const blastScale = explosion.radius * (0.5 + progress * 1.8);
    const spriteScreenH = Math.min((viewH * blastScale / explosionDist) | 0, viewH * 1.4);
    const spriteScreenW = spriteScreenH;
    const drawStartY = ((viewH / 2) - spriteScreenH / 2) | 0;
    const drawStartX = (screenX - spriteScreenW / 2) | 0;
    const coreColor = explosion.kind === 'door' ? '0,255,220' : explosion.kind === 'impact' ? '255,230,90' : '255,92,0';
    const rimColor = explosion.kind === 'player' ? '255,20,20' : '255,180,40';

    for (let sx = 0; sx < spriteScreenW; sx += 2) {
      const screenCol = drawStartX + sx;
      if (screenCol < 0 || screenCol >= W) continue;
      if ((zBuffer[screenCol] ?? 0) < explosionDist) continue;

      const nx = sx / spriteScreenW - 0.5;
      const ring = Math.abs(Math.hypot(nx, 0) - progress * 0.42);
      const columnHeight = Math.max(2, spriteScreenH * Math.max(0, 1 - Math.abs(nx) * 2));
      const jitter = Math.sin((sx + explosion.id * 19) * 0.31) * spriteScreenH * 0.08;
      const yMid = drawStartY + spriteScreenH / 2 + jitter;
      const alpha = Math.max(0, fade * (ring < 0.08 ? 0.9 : 0.45));
      ctx.fillStyle = `rgba(${ring < 0.08 ? rimColor : coreColor},${alpha})`;
      ctx.fillRect(screenCol, yMid - columnHeight / 2, 2, columnHeight);
    }

    ctx.fillStyle = `rgba(255,255,255,${fade * 0.45})`;
    ctx.beginPath();
    ctx.arc(screenX, viewH / 2, Math.max(3, spriteScreenH * 0.08), 0, Math.PI * 2);
    ctx.fill();
  }

  // Weapon
  const muzzle = gs.muzzleFlash > 0;
  // gun body
  ctx.fillStyle = '#555566';
  ctx.fillRect(W / 2 - 12, H - HUD_H - 90, 24, 70);
  ctx.fillStyle = '#333';
  ctx.fillRect(W / 2 - 8, H - HUD_H - 30, 16, 30);
  if (muzzle) {
    ctx.fillStyle = '#ffdd00';
    ctx.beginPath();
    ctx.arc(W / 2, H - HUD_H - 95, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(W / 2, H - HUD_H - 95, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Crosshair
  const cx2 = W / 2;
  const cy2 = (H - HUD_H) / 2;
  ctx.strokeStyle = 'rgba(255,255,255,0.85)';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(cx2 - 10, cy2); ctx.lineTo(cx2 + 10, cy2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx2, cy2 - 10); ctx.lineTo(cx2, cy2 + 10); ctx.stroke();

  // HUD bar
  const hudY = H - HUD_H;
  ctx.fillStyle = 'rgba(0,0,0,0.85)';
  ctx.fillRect(0, hudY, W, HUD_H);
  ctx.strokeStyle = '#441188';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, hudY, W, HUD_H);

  const p = gs.player;
  ctx.font = 'bold 14px monospace';
  ctx.textBaseline = 'top';

  // health
  ctx.fillStyle = '#ff4444';
  ctx.fillText('HP', 14, hudY + 8);
  ctx.fillStyle = p.health > 50 ? '#00ff44' : p.health > 25 ? '#ffcc00' : '#ff2200';
  ctx.fillRect(40, hudY + 10, Math.max(0, (p.health / 100) * 100), 14);
  ctx.strokeStyle = '#888';
  ctx.strokeRect(40, hudY + 10, 100, 14);
  ctx.fillStyle = '#fff';
  ctx.fillText(`${p.health}`, 40, hudY + 28);

  // armor
  ctx.fillStyle = '#8888ff';
  ctx.fillText('AR', 160, hudY + 8);
  ctx.fillStyle = '#4444ff';
  ctx.fillRect(186, hudY + 10, Math.max(0, (p.armor / 100) * 100), 14);
  ctx.strokeStyle = '#888';
  ctx.strokeRect(186, hudY + 10, 100, 14);
  ctx.fillStyle = '#fff';
  ctx.fillText(`${p.armor}`, 186, hudY + 28);

  // ammo
  ctx.fillStyle = '#ffcc00';
  ctx.fillText('AMMO', 306, hudY + 8);
  ctx.fillStyle = '#ffcc00';
  ctx.fillText(`${p.ammo}`, 306, hudY + 28);

  // score
  ctx.fillStyle = '#aaffaa';
  ctx.fillText('SCORE', 380, hudY + 8);
  ctx.fillStyle = '#aaffaa';
  ctx.fillText(`${p.score}`, 380, hudY + 28);

  // remaining sentries
  const sentriesLeft = gs.enemies.filter(enemy => enemy.state !== 'dead').length;
  ctx.fillStyle = '#ff9955';
  ctx.fillText('SENTRIES', 460, hudY + 8);
  ctx.fillStyle = '#ff9955';
  ctx.fillText(`${sentriesLeft}`, 460, hudY + 28);

  // key status
  ctx.fillStyle = p.hasKey ? '#00ccff' : '#555';
  ctx.fillText(p.hasKey ? 'KEY: ACCESS SHARD' : 'KEY: NONE', 560, hudY + 18);

  // objective
  ctx.fillStyle = '#dddddd';
  ctx.font = '12px monospace';
  ctx.fillText(p.hasKey ? 'Find the exit portal →' : 'Find the Access Shard →', 560, hudY + 38);

  // minimap
  const mmX = W - 130;
  const mmY = hudY + 4;
  const mmW = 120;
  const mmH = HUD_H - 8;
  const mmCellW = mmW / MAP_COLS;
  const mmCellH = mmH / MAP_ROWS;

  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(mmX, mmY, mmW, mmH);
  for (let r = 0; r < MAP_ROWS; r++) {
    for (let c = 0; c < MAP_COLS; c++) {
      const cell = gs.wallMap[r]?.[c] ?? 0;
      if (cell === 0) continue;
      if (cell === 1) ctx.fillStyle = '#443366';
      else if (cell === 2) ctx.fillStyle = '#996600';
      else if (cell === 3) ctx.fillStyle = '#cc2200';
      else if (cell === 4) ctx.fillStyle = '#00ddaa';
      else ctx.fillStyle = '#222';
      ctx.fillRect(mmX + c * mmCellW, mmY + r * mmCellH, mmCellW, mmCellH);
    }
  }
  // enemies on minimap
  for (const e of gs.enemies) {
    if (e.state === 'dead') continue;
    ctx.fillStyle = '#ff6600';
    ctx.fillRect(mmX + e.x * mmCellW - 1, mmY + e.y * mmCellH - 1, 3, 3);
  }
  // player on minimap
  ctx.fillStyle = '#00ff88';
  ctx.fillRect(mmX + p.x * mmCellW - 2, mmY + p.y * mmCellH - 2, 4, 4);
  // direction indicator
  ctx.strokeStyle = '#00ff88';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(mmX + p.x * mmCellW, mmY + p.y * mmCellH);
  ctx.lineTo(mmX + (p.x + Math.cos(p.angle) * 1.5) * mmCellW,
             mmY + (p.y + Math.sin(p.angle) * 1.5) * mmCellH);
  ctx.stroke();

  // No-ammo and no-key flashes
  if (gs.noAmmoFlash > 0 || gs.noKeyFlash > 0 || gs.feedbackTimer > 0) {
    ctx.font = 'bold 20px monospace';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    let msg = gs.feedbackMsg;
    if (!msg && gs.noAmmoFlash > 0) msg = 'OUT OF ENERGY CELLS';
    if (!msg && gs.noKeyFlash > 0) msg = 'ACCESS SHARD REQUIRED';
    ctx.fillStyle = `rgba(255,80,0,${Math.min(1, (gs.noAmmoFlash + gs.noKeyFlash + gs.feedbackTimer) * 2)})`;
    ctx.fillText(msg, W / 2, (H - HUD_H) / 2 + 50);
    ctx.textAlign = 'left';
  }

  // Overlay states
  if (gs.phase === 'intro') drawIntroOverlay(ctx);
  if (gs.phase === 'dead')  drawDeadOverlay(ctx);
  if (gs.phase === 'victory') drawVictoryOverlay(ctx, gs.player.score);
}

function drawIntroOverlay(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = 'rgba(0,0,0,0.88)';
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = 'bold 52px monospace';
  ctx.fillStyle = '#cc44ff';
  ctx.fillText('NEON LABYRINTH', W / 2, H / 2 - 110);

  ctx.font = '18px monospace';
  ctx.fillStyle = '#888899';
  ctx.fillText('A RETRO FIRST-PERSON EXPERIENCE', W / 2, H / 2 - 68);

  const lines = [
    'OBJECTIVE: Collect the ACCESS SHARD then reach the EXIT PORTAL',
    '',
    'W / ↑ Forward    S / ↓ Back',
    'A / D  Strafe    Q / E  Turn',
    '← / →  Turn      SPACE / Click  Fire',
    'F / Enter  Interact / Open door    R  Restart',
  ];
  ctx.font = '15px monospace';
  ctx.fillStyle = '#aaaacc';
  lines.forEach((l, i) => ctx.fillText(l, W / 2, H / 2 - 20 + i * 24));

  ctx.font = 'bold 22px monospace';
  ctx.fillStyle = '#00ff88';
  const blink = Math.floor(Date.now() / 600) % 2 === 0;
  if (blink) ctx.fillText('PRESS ENTER, SPACE OR CLICK TO BEGIN', W / 2, H / 2 + 145);

  ctx.textAlign = 'left';
}

function drawDeadOverlay(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = 'rgba(80,0,0,0.8)';
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 64px monospace';
  ctx.fillStyle = '#ff2222';
  ctx.fillText('SIGNAL LOST', W / 2, H / 2 - 40);
  ctx.font = '22px monospace';
  ctx.fillStyle = '#cccccc';
  ctx.fillText('PRESS R TO RESTART', W / 2, H / 2 + 30);
  ctx.textAlign = 'left';
}

function drawVictoryOverlay(ctx: CanvasRenderingContext2D, score: number): void {
  ctx.fillStyle = 'rgba(0,20,40,0.85)';
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 56px monospace';
  ctx.fillStyle = '#00ffcc';
  ctx.fillText('PORTAL ACCESSED', W / 2, H / 2 - 50);
  ctx.font = '24px monospace';
  ctx.fillStyle = '#aaffee';
  ctx.fillText(`FINAL SCORE: ${score}`, W / 2, H / 2 + 20);
  ctx.font = '18px monospace';
  ctx.fillStyle = '#cccccc';
  ctx.fillText('PRESS R TO PLAY AGAIN', W / 2, H / 2 + 70);
  ctx.textAlign = 'left';
}

// Game update
function update(gs: GameState, dt: number, keys: Set<string>): void {
  if (gs.phase !== 'playing') return;

  const p = gs.player;
  const move = MOVE_SPEED * dt;
  const rot  = ROT_SPEED * dt;

  // rotation
  if (keys.has('KeyQ') || keys.has('ArrowLeft'))  p.angle -= rot;
  if (keys.has('KeyE') || keys.has('ArrowRight')) p.angle += rot;

  // movement
  const forward = (keys.has('KeyW') || keys.has('ArrowUp'))   ? move : 0;
  const back    = (keys.has('KeyS') || keys.has('ArrowDown'))  ? move : 0;
  const strafeR = keys.has('KeyD') ? move : 0;
  const strafeL = keys.has('KeyA') ? move : 0;
  const fwd = forward - back;
  const strafe = strafeR - strafeL;
  const dx = Math.cos(p.angle) * fwd + Math.cos(p.angle + Math.PI / 2) * strafe;
  const dy = Math.sin(p.angle) * fwd + Math.sin(p.angle + Math.PI / 2) * strafe;
  if (dx !== 0 || dy !== 0) movePlayer(gs, dx, dy);

  // timers
  gs.weaponCooldown  = Math.max(0, gs.weaponCooldown - dt);
  gs.muzzleFlash     = Math.max(0, gs.muzzleFlash - dt);
  gs.noAmmoFlash     = Math.max(0, gs.noAmmoFlash - dt);
  gs.noKeyFlash      = Math.max(0, gs.noKeyFlash - dt);
  gs.feedbackTimer   = Math.max(0, gs.feedbackTimer - dt);
  for (const explosion of gs.explosions) {
    explosion.age += dt;
  }
  gs.explosions = gs.explosions.filter(explosion => explosion.age < explosion.duration);

  // pickups
  for (const pu of gs.pickups) {
    if (pu.collected) continue;
    if (dist2(p.x, p.y, pu.x, pu.y) < PICKUP_RADIUS ** 2) {
      pu.collected = true;
      if (pu.kind === 'health') { p.health = Math.min(100, p.health + 25); setFeedback(gs, '+25 HP'); }
      else if (pu.kind === 'ammo')  { p.ammo += 20; setFeedback(gs, '+20 ENERGY CELLS'); }
      else if (pu.kind === 'armor') { p.armor = Math.min(100, p.armor + 30); setFeedback(gs, '+30 ARMOR'); }
      else if (pu.kind === 'key')   { p.hasKey = true; setFeedback(gs, 'ACCESS SHARD ACQUIRED!'); }
    }
  }

  // exit portal
  const pCol = Math.floor(p.x);
  const pRow = Math.floor(p.y);
  if ((gs.wallMap[pRow]?.[pCol] ?? 0) === 4 && p.hasKey) {
    gs.phase = 'victory';
    return;
  }

  // enemies
  for (const en of gs.enemies) {
    if (en.state === 'dead') continue;
    en.hitFlash = Math.max(0, en.hitFlash - dt);
    const d2 = dist2(en.x, en.y, p.x, p.y);
    const d  = Math.sqrt(d2);
    const los = hasLOS(gs, en.x, en.y, p.x, p.y);

    if (d < ENEMY_SIGHT_RANGE && los) {
      en.state = 'chase';
    } else if (d >= ENEMY_SIGHT_RANGE) {
      en.state = 'idle';
    }

    if (en.state === 'chase') {
      if (d > ENEMY_ATTACK_RANGE) {
        const ex = (p.x - en.x) / d * ENEMY_SPEED * dt;
        const ey = (p.y - en.y) / d * ENEMY_SPEED * dt;
        const nx = en.x + ex;
        const ny = en.y + ey;
        if (!isSolid(gs, nx, en.y)) en.x = nx;
        if (!isSolid(gs, en.x, ny)) en.y = ny;
      } else {
        en.state = 'attack';
      }
    }

    if (en.state === 'attack') {
      en.attackTimer -= dt;
      if (en.attackTimer <= 0) {
        en.attackTimer = ENEMY_ATTACK_INTERVAL;
        const dmg = Math.max(0, ENEMY_DAMAGE - p.armor * 0.3) | 0;
        if (p.armor > 0) {
          const armorAbs = Math.min(p.armor, ENEMY_DAMAGE * 0.3 | 0);
          p.armor = Math.max(0, p.armor - armorAbs);
        }
        p.health -= dmg;
        if (d > ENEMY_ATTACK_RANGE) en.state = 'chase';
      }
    }

    if (p.health <= 0) {
      spawnExplosion(gs, p.x, p.y, 'player', 1.4, DEATH_EXPLOSION_DURATION);
      gs.phase = 'dead';
      return;
    }
  }
}

function setFeedback(gs: GameState, msg: string): void {
  gs.feedbackMsg = msg;
  gs.feedbackTimer = 2.0;
}

function handleShoot(gs: GameState): void {
  if (gs.phase !== 'playing') return;
  if (gs.weaponCooldown > 0) return;
  if (gs.player.ammo <= 0) { gs.noAmmoFlash = 1.0; return; }
  gs.player.ammo--;
  gs.weaponCooldown = WEAPON_COOLDOWN;
  gs.muzzleFlash = MUZZLE_FLASH_DUR;

  const { x, y, angle } = gs.player;
  let bestDist = Infinity;
  let bestEnemy: Enemy | null = null;
  for (const en of gs.enemies) {
    if (en.state === 'dead') continue;
    const dx = en.x - x;
    const dy = en.y - y;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d > 18) continue;
    const toAngle = Math.atan2(dy, dx);
    const diff = Math.atan2(Math.sin(toAngle - angle), Math.cos(toAngle - angle));
    if (Math.abs(diff) < 0.18 && d < bestDist && hasLOS(gs, x, y, en.x, en.y)) {
      bestDist = d;
      bestEnemy = en;
    }
  }
  if (bestEnemy) {
    bestEnemy.health -= WEAPON_DAMAGE;
    bestEnemy.hitFlash = 0.15;
    spawnExplosion(gs, bestEnemy.x, bestEnemy.y, 'impact', 0.55, IMPACT_EXPLOSION_DURATION);
    if (bestEnemy.health <= 0) {
      bestEnemy.health = 0;
      bestEnemy.state = 'dead';
      gs.player.score += 100;
      spawnExplosion(gs, bestEnemy.x, bestEnemy.y, 'death', 1.2, DEATH_EXPLOSION_DURATION);
      setFeedback(gs, 'SENTRY CORE DETONATED');

      for (const nearby of gs.enemies) {
        if (nearby.state === 'dead' || nearby.id === bestEnemy.id) continue;
        const distanceSq = dist2(bestEnemy.x, bestEnemy.y, nearby.x, nearby.y);
        if (distanceSq <= DEATH_BLAST_RADIUS ** 2 && hasLOS(gs, bestEnemy.x, bestEnemy.y, nearby.x, nearby.y)) {
          nearby.health -= DEATH_BLAST_DAMAGE;
          nearby.hitFlash = 0.2;
          if (nearby.health <= 0) {
            nearby.health = 0;
            nearby.state = 'dead';
            gs.player.score += 100;
            spawnExplosion(gs, nearby.x, nearby.y, 'death', 1.0, DEATH_EXPLOSION_DURATION);
          }
        }
      }
    }
  }
}

function hasDoorInteractionLOS(gs: GameState, ax: number, ay: number, bx: number, by: number, target: Door): boolean {
  const steps = 30;
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    const cx = ax + (bx - ax) * t;
    const cy = ay + (by - ay) * t;
    const col = Math.floor(cx);
    const row = Math.floor(cy);
    if (row === target.row && col === target.col) continue;

    const cell = gs.wallMap[row]?.[col] ?? 1;
    if (cell === 1) return false;
    if (cell === 2 || cell === 3) {
      let blockingDoor: Door | undefined;
      for (const door of gs.doors) {
        if (door.row === row && door.col === col) {
          blockingDoor = door;
          break;
        }
      }
      if (!blockingDoor || blockingDoor.openAmount < 0.5) return false;
    }
  }
  return true;
}

function handleInteract(gs: GameState): void {
  if (gs.phase !== 'playing') return;
  const { x, y, angle } = gs.player;
  const maxDist = INTERACT_DIST + 0.4;
  let door: Door | undefined;
  let bestDist = Infinity;

  for (const candidate of gs.doors) {
    const doorX = candidate.col + 0.5;
    const doorY = candidate.row + 0.5;
    const dx = doorX - x;
    const dy = doorY - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > maxDist || dist >= bestDist) continue;

    const toDoor = Math.atan2(dy, dx);
    const angleDiff = Math.abs(Math.atan2(Math.sin(toDoor - angle), Math.cos(toDoor - angle)));
    if (angleDiff > 0.65) continue;
    if (!hasDoorInteractionLOS(gs, x, y, doorX, doorY, candidate)) continue;

    door = candidate;
    bestDist = dist;
  }

  if (door) {
    if (door.locked) {
      if (gs.player.hasKey) {
        door.locked = false;
        door.open = true;
        gs.wallMap[door.row][door.col] = 2;
        spawnExplosion(gs, door.col + 0.5, door.row + 0.5, 'door', 0.9, DOOR_EXPLOSION_DURATION);
        setFeedback(gs, 'LOCKED DOOR OPENED!');
      } else {
        gs.noKeyFlash = 1.0;
      }
    } else if (!door.open) {
      door.open = true;
      spawnExplosion(gs, door.col + 0.5, door.row + 0.5, 'door', 0.65, DOOR_EXPLOSION_DURATION);
      setFeedback(gs, 'DOOR OPENED');
    }
  }
}

// Component
const RetroFpsGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gsRef     = useRef<GameState>(buildInitialState());
  const keysRef   = useRef<Set<string>>(new Set());
  const rafRef    = useRef<number>(0);
  const shootRef  = useRef<boolean>(false);
  const interactRef = useRef<boolean>(false);

  const loop = useCallback((ts: number) => {
    const gs = gsRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dt = Math.min((ts - gs.lastTime) / 1000, 0.05);
    gs.lastTime = ts;

    // door animation
    for (const door of gs.doors) {
      if (door.open && door.openAmount < 1) {
        door.openAmount = Math.min(1, door.openAmount + dt * 2);
      }
    }

    if (shootRef.current) { handleShoot(gs); shootRef.current = false; }
    if (interactRef.current) { handleInteract(gs); interactRef.current = false; }

    update(gs, dt, keysRef.current);
    render(ctx, gs);

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.focus();
    gsRef.current.lastTime = performance.now();
    rafRef.current = requestAnimationFrame(loop);

    const HANDLED_KEYS = new Set([
      'KeyW','KeyS','KeyA','KeyD','KeyQ','KeyE',
      'ArrowUp','ArrowDown','ArrowLeft','ArrowRight',
      'Space','KeyF','Enter','KeyR',
    ]);

    const onKeyDown = (e: KeyboardEvent) => {
      if (!HANDLED_KEYS.has(e.code)) return;
      e.preventDefault();
      keysRef.current.add(e.code);

      const gs = gsRef.current;
      if (e.code === 'Space') {
        if (gs.phase === 'intro') { gs.phase = 'playing'; return; }
        shootRef.current = true;
      }
      if (e.code === 'Enter') {
        if (gs.phase === 'intro') { gs.phase = 'playing'; return; }
        interactRef.current = true;
      }
      if (e.code === 'KeyF') interactRef.current = true;
      if (e.code === 'KeyR') { gsRef.current = buildInitialState(); gsRef.current.phase = 'playing'; gsRef.current.lastTime = performance.now(); }
    };

    const onKeyUp = (e: KeyboardEvent) => { keysRef.current.delete(e.code); };

    const onClick = () => {
      const gs = gsRef.current;
      if (gs.phase === 'intro') { gs.phase = 'playing'; return; }
      if (gs.phase === 'playing') shootRef.current = true;
    };

    canvas.addEventListener('keydown', onKeyDown);
    canvas.addEventListener('keyup',   onKeyUp);
    canvas.addEventListener('click',   onClick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('keydown', onKeyDown);
      canvas.removeEventListener('keyup',   onKeyUp);
      canvas.removeEventListener('click',   onClick);
    };
  }, [loop]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      className="game-canvas"
      tabIndex={0}
      aria-label="Neon Labyrinth — retro first-person shooter. Use WASD to move, Q/E to turn, Space to fire, F to interact with doors."
    />
  );
};

export default RetroFpsGame;
