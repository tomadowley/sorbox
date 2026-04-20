import React, { useEffect, useRef } from 'react';

type Vec2 = {
  x: number;
  y: number;
};

type Player = {
  pos: Vec2;
  vel: Vec2;
  width: number;
  height: number;
  onGround: boolean;
};

type Platform = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Goal = {
  x: number;
  y: number;
  size: number;
};

type InputState = {
  left: boolean;
  right: boolean;
  jump: boolean;
  restart: boolean;
};

const createLevel = (
  canvasWidth: number,
  canvasHeight: number
): { platforms: Platform[]; goal: Goal } => {
  const groundHeight = 40;
  const platforms: Platform[] = [
    {
      x: 0,
      y: canvasHeight - groundHeight,
      width: canvasWidth,
      height: groundHeight,
    },
    {
      x: 80,
      y: canvasHeight - 160,
      width: 160,
      height: 18,
    },
    {
      x: 320,
      y: canvasHeight - 230,
      width: 190,
      height: 18,
    },
    {
      x: 620,
      y: canvasHeight - 180,
      width: 200,
      height: 18,
    },
    {
      x: 260,
      y: canvasHeight - 320,
      width: 150,
      height: 18,
    },
    {
      x: 540,
      y: canvasHeight - 280,
      width: 140,
      height: 18,
    },
  ];

  const goalSize = 26;
  const lastPlatform = platforms[platforms.length - 1];

  const goal: Goal = {
    x: lastPlatform.x + lastPlatform.width - goalSize - 14,
    y: lastPlatform.y - goalSize - 4,
    size: goalSize,
  };

  return { platforms, goal };
};

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const { platforms, goal } = createLevel(width, height);

    const player: Player = {
      pos: { x: 60, y: height - 140 },
      vel: { x: 0, y: 0 },
      width: 28,
      height: 38,
      onGround: false,
    };

    const input: InputState = {
      left: false,
      right: false,
      jump: false,
      restart: false,
    };

    const gravity = 0.7;
    const moveAcceleration = 0.7;
    const maxSpeedX = 6.2;
    const friction = 0.8;
    const jumpStrength = -13.5;

    let won = false;
    let animationFrameId: number;

    const resetPlayer = () => {
      player.pos.x = 60;
      player.pos.y = height - 140;
      player.vel.x = 0;
      player.vel.y = 0;
      player.onGround = false;
      won = false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
          input.left = true;
          break;
        case 'ArrowRight':
        case 'KeyD':
          input.right = true;
          break;
        case 'ArrowUp':
        case 'KeyW':
        case 'Space':
          input.jump = true;
          break;
        case 'KeyR':
          input.restart = true;
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
          input.left = false;
          break;
        case 'ArrowRight':
        case 'KeyD':
          input.right = false;
          break;
        case 'ArrowUp':
        case 'KeyW':
        case 'Space':
          input.jump = false;
          break;
        case 'KeyR':
          input.restart = false;
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const update = () => {
      if (input.restart) {
        resetPlayer();
      }

      if (won) {
        player.vel.x *= 0.9;
        player.vel.y += gravity * 0.3;
        player.pos.x += player.vel.x;
        player.pos.y += player.vel.y;
        return;
      }

      if (input.left) {
        player.vel.x -= moveAcceleration;
      }
      if (input.right) {
        player.vel.x += moveAcceleration;
      }

      player.vel.x *= friction;

      if (player.vel.x > maxSpeedX) player.vel.x = maxSpeedX;
      if (player.vel.x < -maxSpeedX) player.vel.x = -maxSpeedX;

      player.vel.y += gravity;

      if (input.jump && player.onGround) {
        player.vel.y = jumpStrength;
        player.onGround = false;
      }

      const prevY = player.pos.y;
      player.pos.y += player.vel.y;
      player.onGround = false;

      if (player.pos.y + player.height > height) {
        player.pos.y = height - player.height;
        player.vel.y = 0;
        player.onGround = true;
      }

      for (const plat of platforms) {
        const withinX =
          player.pos.x + player.width > plat.x &&
          player.pos.x < plat.x + plat.width;

        const wasAbove = prevY + player.height <= plat.y;
        const nowOverlapping =
          player.pos.y + player.height >= plat.y &&
          player.pos.y + player.height <= plat.y + plat.height;

        if (withinX && wasAbove && nowOverlapping && player.vel.y >= 0) {
          player.pos.y = plat.y - player.height;
          player.vel.y = 0;
          player.onGround = true;
        }
      }

      const prevX = player.pos.x;
      player.pos.x += player.vel.x;

      if (player.pos.x < 0) {
        player.pos.x = 0;
        player.vel.x = 0;
      }
      if (player.pos.x + player.width > width) {
        player.pos.x = width - player.width;
        player.vel.x = 0;
      }

      for (const plat of platforms) {
        const overlapY =
          player.pos.y + player.height > plat.y &&
          player.pos.y < plat.y + plat.height;

        if (!overlapY) continue;

        const hittingRightSide =
          prevX + player.width <= plat.x &&
          player.pos.x + player.width > plat.x;

        const hittingLeftSide =
          prevX >= plat.x + plat.width &&
          player.pos.x < plat.x + plat.width;

        if (hittingRightSide) {
          player.pos.x = plat.x - player.width;
          player.vel.x = 0;
        } else if (hittingLeftSide) {
          player.pos.x = plat.x + plat.width;
          player.vel.x = 0;
        }
      }

      const centerX = player.pos.x + player.width / 2;
      const centerY = player.pos.y + player.height / 2;

      const inGoalX = centerX >= goal.x && centerX <= goal.x + goal.size;
      const inGoalY = centerY >= goal.y && centerY <= goal.y + goal.size;

      if (inGoalX && inGoalY) {
        won = true;
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#1b263b');
      gradient.addColorStop(0.4, '#1d3557');
      gradient.addColorStop(1, '#0b1020');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      for (let i = 0; i < 6; i += 1) {
        ctx.fillRect(i * 180 + 40, 40 + (i % 3) * 30, 2, 2);
      }

      for (const plat of platforms) {
        const topColor = '#3f51b5';
        const bottomColor = '#283593';

        const platGradient = ctx.createLinearGradient(
          plat.x,
          plat.y,
          plat.x,
          plat.y + plat.height
        );
        platGradient.addColorStop(0, topColor);
        platGradient.addColorStop(1, bottomColor);

        ctx.fillStyle = platGradient;
        ctx.fillRect(plat.x, plat.y, plat.width, plat.height);

        ctx.fillStyle = 'rgba(255,255,255,0.12)';
        ctx.fillRect(plat.x, plat.y, plat.width, 3);
      }

      ctx.save();
      ctx.translate(goal.x + goal.size / 2, goal.y + goal.size / 2);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = won ? '#ffeb3b' : '#ffc400';
      ctx.fillRect(-goal.size / 2, -goal.size / 2, goal.size, goal.size);
      ctx.restore();

      ctx.beginPath();
      ctx.arc(
        goal.x + goal.size / 2,
        goal.y + goal.size + 10,
        6,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = won ? '#8bc34a' : '#ffcc80';
      ctx.fillRect(player.pos.x, player.pos.y, player.width, player.height);

      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.fillRect(
        player.pos.x,
        player.pos.y + player.height - 7,
        player.width,
        7
      );

      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      const shadowWidth = player.width * 1.4;
      const shadowX = player.pos.x + player.width / 2 - shadowWidth / 2;
      const shadowY = Math.min(height - 16, player.pos.y + player.height + 10);
      ctx.beginPath();
      ctx.ellipse(
        shadowX + shadowWidth / 2,
        shadowY,
        shadowWidth / 2,
        6,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      if (won) {
        ctx.fillStyle = 'rgba(5, 10, 30, 0.75)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#e3f2fd';
        ctx.font =
          '28px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('You reached the goal!', width / 2, height / 2 - 10);

        ctx.fillStyle = '#bbdefb';
        ctx.font =
          '16px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText('Press R to restart', width / 2, height / 2 + 18);
      }
    };

    const loop = () => {
      update();
      render();
      animationFrameId = window.requestAnimationFrame(loop);
    };

    animationFrameId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="game-root" data-testid="platformer-root">
      <h1 className="game-title">Mini Platformer</h1>
      <p className="game-subtitle">
        Move with <strong>A / D</strong> or <strong>← / →</strong>, jump with{' '}
        <strong>W / ↑ / Space</strong>. Reach the glowing diamond.
      </p>
      <div className="game-canvas-wrapper">
        <canvas ref={canvasRef} width={960} height={540} />
      </div>
    </div>
  );
};

export default Game;