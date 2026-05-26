/**
 * Radix sort (LSD) for non-negative integers.
 * Returns a new array sorted in ascending order.
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length === 0) return [];

  // Ensure all are non-negative integers
  if (arr.some(n => n < 0 || !Number.isInteger(n))) {
    throw new Error("radixSort requires non-negative integers");
  }

  let result = arr.slice();
  const max = Math.max(...result);
  let exp = 1;

  while (Math.floor(max / exp) > 0) {
    const buckets: number[][] = Array.from({ length: 10 }, () => []);
    for (const num of result) {
      const digit = Math.floor(num / exp) % 10;
      buckets[digit].push(num);
    }
    result = ([] as number[]).concat(...buckets);
    exp *= 10;
  }

  return result;
}