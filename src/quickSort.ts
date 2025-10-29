/**
 * Sorts an array using the quick sort algorithm.
 * Returns a new array sorted in ascending order.
 */
export function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr.slice();

  const pivot = arr[arr.length - 1];
  const left: number[] = [];
  const right: number[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    const val = arr[i];
    if (val < pivot) {
      left.push(val);
    } else {
      right.push(val);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}