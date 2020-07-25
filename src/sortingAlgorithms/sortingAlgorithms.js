export function getMergeSortAnimations(array) {
		const animations = [];
		if (array.length <= 1) return array;
		const auxiliaryArray = array.slice();
		mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
		return animations;
  	}
  
  function mergeSortHelper(mainArray,startIdx,endIdx,auxiliaryArray, animations) {
		if (startIdx === endIdx) return;
		const middleIdx = Math.floor((startIdx + endIdx) / 2);
		mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
		mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
		doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
	}
  
  function doMerge(mainArray,startIdx,middleIdx, endIdx,auxiliaryArray, animations) {
	let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
}

export function getBubbleSortAnimations(array) {
	const animations = [];
	if (array.length <= 1) return array;

	// sorting length decreases with each iteration
	let x = 0;
	while (1) {
		var notSorted = 0;
		for(var i = 0; i < array.length - 1 - x; i++) {
		animations.push([i,i+1]);
		animations.push([i,i+1]);
		if (array[i] > array[i+1]) {
			var temp = array[i];
			array[i] = array[i+1];
			array[i+1] = temp;
			notSorted = 1;
			
		}

		animations.push([i, array[i]]);
		animations.push([i+1, array[i+1]]);
		
		}
		
		
		if (notSorted === 0) {
		break;

		x++;
		}

		
	}

	return animations;
}

///////////////////// HEAP SORT //////////////////////////////

export function getHeapSortAnimations(array) {
	const animations = [];
	heapSort(array, animations);
	return animations;
}

function heapSort(array, animations) {

	let n = array.length;
	//build heap 
	for (let i = n / 2 - 1; i >= 0; i--) {
		heapify(array,n, i, animations);
	}

	// one by one extract element from heap
	for (let i = n - 1; i > 0; i--) {
		// move current root to end
		animations.push([0,0]);
		animations.push([0,0]);
		animations.push([i,i]);
		animations.push([i,i]);
		let temp = array[0];
		array[0] = array[i];
		array[i] = temp;
		animations.push([0, array[0]]);
		animations.push([i, array[i]]);
		// call max heapify on the reduced heap
		heapify(array, i, 0,animations);
	}

	
  
}

function heapify(array, n, i, animations) {

	// initialise largest as root
	let largest = i;
	let left = 2 * i + 1;
	let right = 2 * i + 2;

	// If left child is larger than root
	if (left < n && array[left] > array[largest]) {
		largest = left;
	}

	// if right child is larger than largest so far
	if (right < n && array[right] > array[largest]) {
		largest = right;
	}
	// if largest is not the root
	if (largest != i) {
		let swap = array[i];
		array[i] = array[largest];
		array[largest] = swap;
		animations.push([i, array[i]]);
		animations.push([largest, array[largest]]);

		// recursively heapify the affected subtree
		heapify(array, n, largest, animations);
	}

	
}


///////////////////// QUICK SORT //////////////////////////////
export function getQuickSortAnimations(array) {
	const animations = [];
	quickSortHelper(array, animations, array.length - 1, 0);
	return animations
}

function quickSortHelper(array,animations, high, low) {
	if (low < high) {
		let p = partition(array, high, low, animations);
		quickSortHelper(array, animations, p - 1, low);
		quickSortHelper(array,animations, high, p + 1);
  }
}

function partition(array, high, low, animations) {
	let pivot = array[high];
	let i = low;
	for (let j = low; j < high; j++) {
		if (array[j] < pivot) {
		animations.push([i, array[j]]);
		animations.push([j, array[i]]);
		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
		i++;
		}

	}

	let swap = array[i];
	array[i] = array[high];
	array[high] = swap;
	animations.push([i, array[i]]);
	animations.push([high, array[high]]);
	return i;
}

///////////////////// INSERTION SORT //////////////////////////////

export function getInsertionSortAnimations(array) {
	const animations = [];
	let n = array.length;

	for (let i = 1; i < n; i++) {
		let key = array[i];
		let j = i - 1
		animations.push([i,j]);
		animations.push([i,j]);
		while(j >= 0 && array[j] > key) {
			array[j + 1] = array[j];
			animations.push([j+1, array[j+1]]);
			j = j - 1;
		}

		array[j + 1] = key;
		animations.push([j+1, array[j+1]]);
	}

	return animations;
}

///////////////////// SELECTION SORT //////////////////////////////


export function getSelectionSortAnimations(array) {
	const animations = [];
	let n = array.length;

	// one by one move boundary of unsorted subarray
	for (let i = 0; i < n - 1; i++) {
		// find the min element in unsorted array
		let min_index = i;
		for (let j = i + 1; j < n; j++) {
			animations.push([i,j]);
			animations.push([i,j]);
			if (array[j] < array[min_index]) {
				min_index = j;
			}
		}

		let temp = array[min_index];
		array[min_index] = array[i];
		array[i] = temp;
		animations.push([min_index, array[min_index]]);
		animations.push([i, array[i]]);
	}

	return animations;
}

///////////////////// SHELL SORT //////////////////////////////

export function getShellSortAnimations(array) {
	const animations = [];

	let n = array.length;

	// start with a big gap, then reduce the gap
	for (let gap = n/2; gap > 0; gap*= 1/2) {
		// do a gapped insertion sort for this gap size. The first
		// gap elements are already in gapped order keep addin one more
		// element until the entire array is gap sorted.

		for (let i = gap; i < n; i++) {
			// add array[i] to the elements that have been gap sorted
			// save array[i] in temp and make a hole at position i
			let temp = array[i];

			// shift earlier gap sorted elements up until the correct
			// location for array[i] is found
			let j;
			for (j = i; j >= gap && array[j - gap] > temp; j=-gap) {
				array[j] = array[j - gap];
				animations.push([j, array[j]]);
				
			}
			// place temp in its correct position
			array[j] = temp;
			
			
		}
	} 

	return animations;
}


export function shuffle(array) {
	const animations = [];
	let counter = 0;
	while (counter < 1500) {
		let randomIndex1 = Math.floor(Math.random() * array.length);
		let randomIndex2 = Math.floor(Math.random() * array.length);
		let temp = array[randomIndex1];
		array[randomIndex1] = array[randomIndex2];
		array[randomIndex2] = temp;
		animations.push([randomIndex1, array[randomIndex1]]);
		animations.push([randomIndex2, array[randomIndex2]]);
		counter++;
	}
	return animations;
}



///////////////////// Linear Search ////////////////////////////

export function getLinearSearchAnimations(array, target) {
	const animations = [];
	for (let i = 0; i < array.length; i++) {
		animations.push([i,i]);
		animations.push([i,i]);
		if (array[i] === target) {
			animations.push([i, -1]);
			break;
		}
		
	}

	return animations;
}

export function getBinarySearchAnimations(array, target) {
	const animations = [];
	let left = 0;
	let right= array.length - 1;
	while (left < right) {
		animations.push([left, left]);
		animations.push([right, right]);
		let middle = left + (right - left) / 2;
		animations.push([middle, -2]);
		if (array[middle] === target) {
			animations.push([middle, -1]);
			break;
		} else if (array[middle] > target) {
			right = middle;
		} else {
			left = middle + 1;
		}
	}

	return animations;
}
