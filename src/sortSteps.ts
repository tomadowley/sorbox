export type AlgoName = 'bubble' | 'selection' | 'insertion';

// A frame is a snapshot of the array at a point in the algorithm
export type Frame = number[];

// Utility to clone and push a new frame
function pushFrame(frames: Frame[], arr: number[]): void {
  frames.push(arr.slice());
}

export function bubbleSortSteps(input: number[]): Frame[] {
  const arr = input.slice();
  const frames: Frame[] = [];
  pushFrame(frames, arr);
  let swapped: boolean;
  do {
    swapped = false;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) {
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        swapped = true;
        pushFrame(frames, arr);
      }
    }
  } while (swapped);
  return frames;
}

export function selectionSortSteps(input: number[]): Frame[] {
  const arr = input.slice();
  const frames: Frame[] = [];
  pushFrame(frames, arr);
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      pushFrame(frames, arr);
    }
  }
  return frames;
}

export function insertionSortSteps(input: number[]): Frame[] {
  const arr = input.slice();
  const frames: Frame[] = [];
  pushFrame(frames, arr);
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
      pushFrame(frames, arr);
    }
    arr[j + 1] = key;
    pushFrame(frames, arr);
  }
  return frames;
}

export function getSteps(algo: AlgoName, input: number[]): Frame[] {
  switch (algo) {
    case 'bubble':
      return bubbleSortSteps(input);
    case 'selection':
      return selectionSortSteps(input);
    case 'insertion':
      return insertionSortSteps(input);
    default:
      return bubbleSortSteps(input);
  }
}
