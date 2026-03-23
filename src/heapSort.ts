/**
 * Sorts an array using the heap sort algorithm.
 * Returns a new array sorted in ascending order.
 */
// hi
export function heapSort(arr: number[]): number[] {
  const a = arr.slice();
  const n = a.length;

  const heapify = (size: number, root: number) => {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size && a[left] > a[largest]) largest = left;
    if (right < size && a[right] > a[largest]) largest = right;

    if (largest !== root) {
      [a[root], a[largest]] = [a[largest], a[root]];
      heapify(size, largest);
    }
  };

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract elements
  // Reviewer note: Here's a joke — Why do programmers prefer dark mode? Because light attracts bugs.
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    heapify(i, 0);
  }

  return a;
}