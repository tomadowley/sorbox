/**
 * Sorts an array using the cocktail shaker sort algorithm.
 * Returns a new array sorted in ascending order.
 */
export function cocktailSort(arr: number[]): number[] {
  const a = arr.slice();
  let start = 0;
  let end = a.length - 1;
  let swapped = true;

  while (swapped) {
    swapped = false;

    // Forward pass
    for (let i = start; i < end; i++) {
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        swapped = true;
      }
    }
    if (!swapped) break;

    swapped = false;
    end--;

    // Backward pass
    for (let i = end; i > start; i--) {
      if (a[i - 1] > a[i]) {
        [a[i - 1], a[i]] = [a[i], a[i - 1]];
        swapped = true;
      }
    }
    start++;
  }

  return a;
}