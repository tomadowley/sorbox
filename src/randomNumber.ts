/**
 * Generates a random integer between min and max (inclusive).
 * @param min - Minimum integer value (inclusive).
 * @param max - Maximum integer value (inclusive).
 * @returns A random integer between min and max.
 */
export function getRandomInt(min: number, max: number): number {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error("Arguments must be integers.");
  }
  if (max < min) {
    throw new Error("Max must be greater than or equal to min.");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}