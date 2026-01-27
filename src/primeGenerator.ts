/**
 * Generates an array of the first `count` prime numbers.
 * @param count The number of prime numbers to generate.
 * @returns An array of prime numbers.
 */
export function generatePrimes(count: number): number[] {
  if (count < 1) return [];
  const primes: number[] = [];
  let num: number = 2;
  while (primes.length < count) {
    if (isPrime(num)) {
      primes.push(num);
    }
    num++;
  }
  return primes;
}

/**
 * Determines whether a given number is a prime.
 * @param n The number to check.
 * @returns True if the number is prime, false otherwise.
 */
function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2, sqrt: number = Math.sqrt(n); i <= sqrt; i++) {
    if (n % i === 0) return false;
  }
  return true;
}