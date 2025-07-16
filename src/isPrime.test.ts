import { isPrime } from './isPrime';

describe('isPrime', () => {
  it('returns true for small primes', () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
    expect(isPrime(5)).toBe(true);
    expect(isPrime(7)).toBe(true);
    expect(isPrime(11)).toBe(true);
    expect(isPrime(13)).toBe(true);
    expect(isPrime(17)).toBe(true);
  });

  it('returns false for non-primes', () => {
    expect(isPrime(0)).toBe(false);
    expect(isPrime(1)).toBe(false);
    expect(isPrime(4)).toBe(false);
    expect(isPrime(6)).toBe(false);
    expect(isPrime(9)).toBe(false);
    expect(isPrime(12)).toBe(false);
    expect(isPrime(15)).toBe(false);
  });

  it('handles large primes and non-primes', () => {
    expect(isPrime(9973)).toBe(true);
    expect(isPrime(10000)).toBe(false);
  });
});