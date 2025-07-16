import React, { useState } from 'react';
import { isPrime } from '../isPrime';

const containerStyle: React.CSSProperties = {
  marginTop: 24,
  background: 'rgba(30,34,50,0.88)',
  borderRadius: 12,
  padding: '1.5rem 2rem',
  boxShadow: '0 2px 14px 0 rgba(0,0,0,0.19)',
  display: 'inline-block',
  minWidth: 300,
  color: '#fff',
};

const labelStyle: React.CSSProperties = {
  fontSize: 16,
  marginBottom: 8,
  display: 'block',
  color: '#f5f6fa',
};

const inputStyle: React.CSSProperties = {
  fontSize: 18,
  padding: '8px 12px',
  borderRadius: 6,
  border: '1px solid #555',
  background: '#23263a',
  color: '#fff',
  outline: 'none',
  width: 140,
  marginRight: 12,
};

const buttonStyle: React.CSSProperties = {
  padding: '8px 18px',
  fontSize: 16,
  borderRadius: 6,
  border: 'none',
  background: 'linear-gradient(90deg, #48c6ef 0%, #6f86d6 100%)',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '0 2px 6px rgba(36,47,87,0.22)',
};

const resultStyleBase: React.CSSProperties = {
  marginTop: 18,
  fontSize: 18,
  fontWeight: 500,
  letterSpacing: 0.2,
};

const resultGreen: React.CSSProperties = {
  ...resultStyleBase,
  color: '#34e88b',
};

const resultRed: React.CSSProperties = {
  ...resultStyleBase,
  color: '#ff6b6b',
};

const resultWarn: React.CSSProperties = {
  ...resultStyleBase,
  color: '#ffe066',
};

export const PrimeChecker: React.FC = () => {
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [isPrimeResult, setIsPrimeResult] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.replace(/[^0-9]/g, ''));
    setChecked(false);
    setIsPrimeResult(null);
  };

  const handleCheck = () => {
    const n = parseInt(input, 10);
    if (!input || isNaN(n) || n <= 0) {
      setChecked(true);
      setIsPrimeResult(null);
      return;
    }
    setChecked(true);
    setIsPrimeResult(isPrime(n));
  };

  let resultElem = null;
  if (checked) {
    const n = parseInt(input, 10);
    if (!input || isNaN(n) || n <= 0) {
      resultElem = (
        <div style={resultWarn}>Please enter a positive integer</div>
      );
    } else if (isPrimeResult) {
      resultElem = (
        <div style={resultGreen}>{n} is a prime number</div>
      );
    } else {
      resultElem = (
        <div style={resultRed}>{n} is not a prime number</div>
      );
    }
  }

  return (
    <div style={containerStyle} data-testid="prime-checker">
      <label htmlFor="prime-input" style={labelStyle}>
        Check if a number is prime:
      </label>
      <input
        id="prime-input"
        data-testid="prime-input"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        style={inputStyle}
        value={input}
        onChange={handleChange}
        placeholder="Enter number"
      />
      <button
        style={buttonStyle}
        onClick={handleCheck}
        data-testid="prime-check"
      >
        Check
      </button>
      {resultElem}
    </div>
  );
};

export default PrimeChecker;