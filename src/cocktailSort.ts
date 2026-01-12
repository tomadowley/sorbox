export function cocktailSort(arr: number[]): number[] {
  const forwardPass = (a: number[], start: number, end: number) => {
    const next = a.slice();
    let swapped = false;
    for (let i = start; i < end; i++) {
      if (next[i] > next[i + 1]) {
        [next[i], next[i + 1]] = [next[i + 1], next[i]];
        swapped = true;
      }
    }
    return { array: next, swapped };
  };

  const backwardPass = (a: number[], start: number, end: number) => {
    const next = a.slice();
    let swapped = false;
    for (let i = end; i > start; i--) {
      if (next[i - 1] > next[i]) {
        [next[i - 1], next[i]] = [next[i], next[i - 1]];
        swapped = true;
      }
    }
    return { array: next, swapped };
  };

  const iterate = (a: number[], start: number, end: number): number[] => {
    if (start >= end) return a;
    const fwd = forwardPass(a, start, end);
    if (!fwd.swapped) return fwd.array;
    const back = backwardPass(fwd.array, start, end - 1);
    if (!back.swapped) return back.array;
    return iterate(back.array, start + 1, end - 1);
  };

  return iterate(arr.slice(), 0, arr.length - 1);
}