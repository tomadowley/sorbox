/**
 * Randomly sorts (shuffles) the elements of an array using the Fisher-Yates algorithm.
 * @param array The array to shuffle.
 * @returns A new array with the elements shuffled.
 */
export function randomSort&lt;T&gt;(array: T[]): T[] {
  const result: T[] = [...array];
  for (let i = result.length - 1; i &gt; 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}