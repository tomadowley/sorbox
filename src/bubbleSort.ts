/**
 * Bubble Sort implementation in TypeScript.
 * Sorts an array in-place using the Bubble Sort algorithm.
 * 
 * @param arr - The array to be sorted.
 * @param compareFn - Optional comparison function.
 *                    If not provided, sorts numbers in ascending order.
 * @returns The sorted array (for chaining).
 */
export function bubbleSort<T>(
  arr: T[],
  compareFn: (a: T, b: T) => number = (a, b) =>
    a < b ? -1 : a > b ? 1 : 0
): T[] {
  const n = arr.length;
  let swapped: boolean;
  do {
    swapped = false;
    for (let i = 1; i < n; i++) {
      if (compareFn(arr[i - 1], arr[i]) > 0) {
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        swapped = true;
      }
    }
  } while (swapped);
  return arr;
}