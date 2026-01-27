/**
 * Sorts an array using the selection sort algorithm.
 * @param array The array to sort.
 * @returns A new array sorted in ascending order.
 */
export function selectionSort&lt;T&gt;(array: T[]): T[] {
  const result: T[] = [...array];
  const n: number = result.length;
  for (let i = 0; i &lt; n - 1; i++) {
    let minIdx: number = i;
    for (let j = i + 1; j &lt; n; j++) {
      if (result[j] &lt; result[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [result[i], result[minIdx]] = [result[minIdx], result[i]];
    }
  }
  return result;
}