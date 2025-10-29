/**
 * Sorts an array using the comb sort algorithm.
 * Returns a new array sorted in ascending order.
 */
export function combSort(arr: number[]): number[] {
  const a = arr.slice();
  const shrink = 1.3;
  let gap = a.length;
  let sorted = false;

  while (!sorted) {
    gap = Math.floor(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }

    let i = 0;
    while (i + gap < a.length) {
      if (a[i] > a[i + gap]) {
        [a[i], a[i + gap]] = [a[i + gap], a[i]];
        sorted = false;
      }
      i++;
    }
  }

  return a;
}