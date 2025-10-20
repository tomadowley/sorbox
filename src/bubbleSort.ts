/**
 * Bubble Sort implementation in TypeScript.
 * Sorts an array in-place using the Bubble Sort algorithm.
 * 
 * @param arr - The array to be sorted.
 * @param compareFn - Optional comparison function.
 *                    If not provided, sorts numbers in ascending order.
 * @returns The sorted array (for chaining).
 */
// Programmer joke: Why did the developer go broke? Because he used up all his cache.
export function bubbleSort<T>(
  arr: T[],
  compareFn: (a: T, b: T) => number = (a, b) =>
    a < b ? -1 : a > b ? 1 : 0
): T[] {
  const n = arr.length;
  let swapped: boolean;
  do {
    swapped = false;
    for (let i = 1; i < n; i++) {
      if (compareFn(arr[i - 1], arr[i]) > 0) {
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        swapped = true;
      }
    }
  } while (swapped);
  return arr;
}

/**
 * Selection Sort implementation in TypeScript.
 * Sorts an array in-place using the Selection Sort algorithm.
 * 
 * @param arr - The array to be sorted.
 * @param compareFn - Optional comparison function.
 * @returns The sorted array (for chaining).
 */
export function selectionSort<T>(
  arr: T[],
  compareFn: (a: T, b: T) => number = (a, b) =>
    a < b ? -1 : a > b ? 1 : 0
): T[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (compareFn(arr[j], arr[minIdx]) < 0) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}
//hi
/**
 * Insertion Sort implementation in TypeScript.
 * Sorts an array in-place using the Insertion Sort algorithm.
 * 
 * @param arr - The array to be sorted.
 * @param compareFn - Optional comparison function.
 * @returns The sorted array (for chaining).
 */
export function insertionSort<T>(
  arr: T[],
  compareFn: (a: T, b: T) => number = (a, b) =>
    a < b ? -1 : a > b ? 1 : 0
): T[] {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && compareFn(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

/**
 * Merge Sort implementation in TypeScript.
 * Returns a new sorted array using the Merge Sort algorithm.
 * 
 * @param arr - The array to be sorted.
 * @param compareFn - Optional comparison function.
 * @returns A new sorted array.
 */
export function mergeSort<T>(
  arr: T[],
  compareFn: (a: T, b: T) => number = (a, b) =>
    a < b ? -1 : a > b ? 1 : 0
): T[] {
  if (arr.length <= 1) return arr.slice();

  const merge = (left: T[], right: T[]): T[] => {
    const result: T[] = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      if (compareFn(left[i], right[j]) <= 0) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
    return result.concat(left.slice(i), right.slice(j));
  };

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), compareFn);
  const right = mergeSort(arr.slice(mid), compareFn);
  return merge(left, right);
}

/**
 * Quick Sort implementation in TypeScript.
 * Returns a new sorted array using the Quick Sort algorithm.
 *
 * @param arr - The array to be sorted.
 * @param compareFn - Optional comparison function.
 * @returns A new sorted array.
 */
export function quickSort<T>(
  arr: T[],
  compareFn: (a: T, b: T) => number = (a, b) =>
    a < b ? -1 : a > b ? 1 : 0
): T[] {
  if (arr.length <= 1) return arr.slice();

  const [pivot, ...rest] = arr;
  const left = rest.filter(item => compareFn(item, pivot) < 0);
  const right = rest.filter(item => compareFn(item, pivot) >= 0);

  return [...quickSort(left, compareFn), pivot, ...quickSort(right, compareFn)];
}

/**
 * Heap Sort implementation in TypeScript.
 * Sorts an array in-place using the Heap Sort algorithm.
 * 
 * @param arr - The array to be sorted.
 * @param compareFn - Optional comparison function.
 * @returns The sorted array (for chaining).
 */
export function heapSort<T>(
  arr: T[],
  compareFn: (a: T, b: T) => number = (a, b) =>
    a < b ? -1 : a > b ? 1 : 0
): T[] {
  const n = arr.length;

  // Heapify
  function heapify(size: number, root: number) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size && compareFn(arr[left], arr[largest]) > 0) {
      largest = left;
    }
    if (right < size && compareFn(arr[right], arr[largest]) > 0) {
      largest = right;
    }

    if (largest !== root) {
      [arr[root], arr[largest]] = [arr[largest], arr[root]];
      heapify(size, largest);
    }
  }

  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(i, 0);
  }

  // For descending order, reverse the array if needed
  if (arr.length >= 2 && compareFn(arr[1], arr[0]) < 0) {
    arr.reverse();
  }

  return arr;
}