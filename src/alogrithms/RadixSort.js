

export function getRadixSortAnimations(arr) {
    const animations = [];
    radixSort(arr, animations);
    return animations;
  }
  
  function getMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  }
  
  function countSort(arr, exp, animations) {
    const n = arr.length;
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);
  
    for (let i = 0; i < n; i++) {
      const index = Math.floor(arr[i] / exp) % 10;
      count[index]++;
      animations.push([[i], false]); // Highlight the element being processed
    }
  
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
  
    for (let i = n - 1; i >= 0; i--) {
      const index = Math.floor(arr[i] / exp) % 10;
      output[count[index] - 1] = arr[i];
      animations.push([[count[index] - 1, arr[i]], true]); // Move the element to its sorted position
      count[index]--;
    }
  
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
    }
  }
  
  function radixSort(arr, animations) {
    const max = getMax(arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      countSort(arr, exp, animations);
    }
  }
  