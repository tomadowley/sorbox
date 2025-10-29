/**
 * Counting sort for arrays of integers (including negatives).
 * Returns a new array sorted in ascending order.
 * Note: Not suitable for very large ranges.
 */
export function countingSort(arr: number[]): number[] {
  if (arr.length === 0) return [];

  let min = arr[0];
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
    if (arr[i] > max) max = arr[i];
  }

  const offset = -min;
  const counts = new Array(max - min + 1).fill(0);

  for (const num of arr) {
    counts[num + offset]++;
  }

  const result: number[] = [];
  for (let value = min; value <= max; value++) {
    const count = counts[value + offset];
    for (let c = 0; c < count; c++) {
      result.push(value);
    }
  }

  return result;
}