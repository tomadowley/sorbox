/**
 * Sorts an array using the quick sort algorithm.
 * Returns a new array sorted in ascending order.
 */
export function quickSort(arr: number[]): number[] {
  // Base case: arrays of length 0 or 1 are already sorted
  if (arr.length <= 1) return arr.slice();

  // Choose a pivot (last element). Other strategies are possible (e.g., median-of-three).
  const pivot = arr[arr.length - 1];

  // Partition the array into elements less than pivot and greater/equal than pivot
  const left: number[] = [];
  const right: number[] = [];

  // Iterate over all but the pivot, and distribute into left/right partitions
  for (let i = 0; i < arr.length - 1; i++) {
    const val = arr[i];
    if (val < pivot) {
      left.push(val);        // Goes to the left partition
    } else {
      right.push(val);       // Goes to the right partition
    }
  }

  // Recursively sort partitions and concatenate: left + pivot + right
  return [...quickSort(left), pivot, ...quickSort(right)];
}