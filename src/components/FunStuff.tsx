import React, { useMemo, useState } from 'react';
import { getRandomInt } from '../randomNumber';

const card: React.CSSProperties = {
  background: 'rgba(30,34,50,0.88)',
  borderRadius: 12,
  padding: '1rem 1.25rem',
  boxShadow: '0 2px 14px 0 rgba(0,0,0,0.19)',
  color: '#fff',
};

const heading: React.CSSProperties = {
  fontSize: 18,
  marginBottom: 8,
  fontWeight: 700,
};

const btn: React.CSSProperties = {
  padding: '8px 14px',
  fontSize: 14,
  borderRadius: 6,
  border: 'none',
  background: 'linear-gradient(90deg, #ff8a00 0%, #e52e71 100%)',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '0 2px 6px rgba(36,47,87,0.22)',
};

const wrap: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: 16,
  width: '100%',
  maxWidth: 920,
};

const small: React.CSSProperties = {
  opacity: 0.9,
  fontSize: 13,
  marginTop: 8,
};

const emojiStage: React.CSSProperties = {
  position: 'relative',
  height: 120,
  overflow: 'hidden',
  background: 'rgba(0,0,0,0.12)',
  borderRadius: 8,
  marginTop: 8,
};

const emojiStyleBase: React.CSSProperties = {
  position: 'absolute',
  fontSize: 22,
  transition: 'transform 0.8s ease, opacity 0.8s ease',
};

function useJokes() {
  return useMemo(
    () => [
      'Why do Java developers wear glasses? Because they don\'t C#.',
      'There are 10 types of people: those who understand binary and those who don\'t.',
      'A SQL query walks into a bar, walks up to two tables and asks: “Can I join you?”',
      'I would tell you a UDP joke, but you might not get it.',
      'To understand recursion, you must first understand recursion.',
      'Knock, knock. Race condition. Who\'s there?'
    ],
    []
  );
}

function randomChoice<T>(arr: T[]): T {
  return arr[getRandomInt(0, arr.length - 1)];
}

const haiku5 = [
  'Silent code hums',
  'Green tests softly glow',
  'Tabs or spaces? Yes.',
  'Ship it to the stars',
  'Merge conflicts at dawn',
  'Commit by commit',
];
const haiku7 = [
  'Refactors whisper at night',
  'Linting guides the weary hands',
  'Types are sails for change',
  'Comments map forgotten paths',
  'Branching rivers meet and merge',
];

export const FunStuff: React.FC = () => {
  const jokes = useJokes();
  const [joke, setJoke] = useState<string>(randomChoice(jokes));

  const [haiku, setHaiku] = useState<string[]>([
    randomChoice(haiku5),
    randomChoice(haiku7),
    randomChoice(haiku5),
  ]);

  const [roll, setRoll] = useState<number | null>(null);

  type Sparkle = { id: number; x: number; y: number; emoji: string };
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const emojis = ['✨', '🎉', '🧠', '🚀', '🧩', '🎈', '🔥', '💡', '🌈', '📦'];

  const makeItRain = () => {
    const items: Sparkle[] = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: getRandomInt(0, 95),
      y: getRandomInt(-20, 80),
      emoji: randomChoice(emojis),
    }));
    setSparkles(items);
    // Clear after a moment
    window.setTimeout(() => setSparkles([]), 1200);
  };

  return (
    <div style={wrap}>
      <div style={card}>
        <div style={heading}>Random Joke</div>
        <div>{joke}</div>
        <div style={{ marginTop: 10 }}>
          <button style={btn} onClick={() => setJoke(randomChoice(jokes))}>New Joke</button>
        </div>
        <div style={small}>All client-side. No external APIs.</div>
      </div>

      <div style={card}>
        <div style={heading}>Haiku Generator</div>
        <div>
          {haiku[0]}<br />
          {haiku[1]}<br />
          {haiku[2]}
        </div>
        <div style={{ marginTop: 10 }}>
          <button
            style={btn}
            onClick={() => setHaiku([randomChoice(haiku5), randomChoice(haiku7), randomChoice(haiku5)])}
          >
            New Haiku
          </button>
        </div>
        <div style={small}>5-7-5 syllable vibe (approximate).</div>
      </div>

      <div style={card}>
        <div style={heading}>Roll a d20</div>
        <div style={{ fontSize: 28, fontWeight: 800, marginTop: 4 }}>
          {roll ?? '—'}
        </div>
        <div style={{ marginTop: 10 }}>
          <button style={btn} onClick={() => setRoll(getRandomInt(1, 20))}>Roll</button>
        </div>
        <div style={small}>{roll === 20 ? 'Critical success!' : roll === 1 ? 'Critical fail…' : 'Roll to your heart\'s content.'}</div>
      </div>

      <div style={card}>
        <div style={heading}>Emoji Rain</div>
        <div style={emojiStage}>
          {sparkles.map((s) => (
            <div
              key={s.id}
              style={{
                ...emojiStyleBase,
                left: `${s.x}%`,
                top: `${s.y}%`,
                transform: 'translateY(20px)',
                opacity: 0.95,
              }}
            >
              {s.emoji}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10 }}>
          <button style={btn} onClick={makeItRain}>Make it rain</button>
        </div>
        <div style={small}>Temporary sprinkle of emoji joy.</div>
      </div>
    </div>
  );
};

export default FunStuff;
