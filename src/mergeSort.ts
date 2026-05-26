/**
 * Performs merge sort on an array and returns a new sorted array.
 * @param arr The array of numbers to sort.
 * @returns A new sorted array.
 */
export function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  const mid: number = Math.floor(arr.length / 2);
  const left: number[] = mergeSort(arr.slice(0, mid));
  const right: number[] = mergeSort(arr.slice(mid));

  return merge(left, right);
}

/**
 * Helper function to merge two sorted arrays into one sorted array.
 * @param left The first sorted array.
 * @param right The second sorted array.
 * @returns The merged sorted array.
 */
function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Add remaining elements, if any
  return result.concat(left.slice(i)).concat(right.slice(j));
}