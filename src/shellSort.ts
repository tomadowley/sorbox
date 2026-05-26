/**
 * Sorts an array using the shell sort algorithm.
 * Returns a new array sorted in ascending order.
 */
export function shellSort(arr: number[]): number[] {
  const a = arr.slice();
  let gap = Math.floor(a.length / 2);

  while (gap > 0) {
    for (let i = gap; i < a.length; i++) {
      const temp = a[i];
      let j = i;
      while (j >= gap && a[j - gap] > temp) {
        a[j] = a[j - gap];
        j -= gap;
      }
      a[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }

  return a;
}