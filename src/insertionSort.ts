/**
 * Sorts an array using the insertion sort algorithm.
 * @param array The array to sort.
 * @returns A new array sorted in ascending order.
 */
export function insertionSort<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = 1; i < result.length; i++) {
    let key = result[i];
    let j = i - 1;
    while (j >= 0 && result[j] > key) {
      result[j + 1] = result[j];
      j--;
    }
    result[j + 1] = key;
  }
  return result;
}