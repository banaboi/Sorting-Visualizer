import React from 'react';
import './SortingVisualiser.css';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms.js';


//////////////////////////////////////////////
////              DEFINES                 ////
//////////////////////////////////////////////

const ANIMATION_SPEED_IN_MS = 1;
const NUMBER_OF_ARRAY_BARS = 150;
const PRIMARY_COLOR = "blue"
const SEARCHING_COLOR = 'whitesmoke'
const SECONDARY_COLOR = 'red'
const FOUND_COLOR = 'GOLD';
const WIDTH = 5;


export default class SortingVisualiser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }


    componentDidMount () {
        this.resetArray();
    }

    // creates an array containing 100 random numbers
    resetArray = () => {
        const array = [];
        for (var i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromIntervals(5,730));
        }

        this.setState({array});
    }


    mergeSort() {
        const animations = sortingAlgorithms.getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_IN_MS);
        } else {
            setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_IN_MS);
          }
        }
      }
    

    quickSort = () => {
        const animations = sortingAlgorithms.getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            setTimeout(() => {
                const [barOneIdx, newHeight1] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight1}px`;
            }, i * ANIMATION_SPEED_IN_MS);
           
        }

    }

    heapSort = () => {
        const animations = sortingAlgorithms.getHeapSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            setTimeout(() => {
                const [barOneIdx, newHeight1] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight1}px`;
            }, i * ANIMATION_SPEED_IN_MS);
           
        }
    }

    bubbleSort = () => {
        const animations = sortingAlgorithms.getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            setTimeout(() => {
                const [barOneIdx, newHeight1] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight1}px`;
            }, i * ANIMATION_SPEED_IN_MS);
           
        }
        
    }

    insertionSort = () => {
        const animations = sortingAlgorithms.getInsertionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            setTimeout(() => {
                const [barOneIdx, newHeight1] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight1}px`;
            }, i * ANIMATION_SPEED_IN_MS);
           
        }
    }

    selectionSort = () => {
        const animations = sortingAlgorithms.getSelectionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            setTimeout(() => {
                const [barOneIdx, newHeight1] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight1}px`;
            }, i * ANIMATION_SPEED_IN_MS);
           
        }
    }

    shellSort = () => {
        const animations = sortingAlgorithms.getShellSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            setTimeout(() => {
                const [barOneIdx, newHeight1] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight1}px`;
            }, i * ANIMATION_SPEED_IN_MS);
           
        }
    }

    shuffle = () => {
        const animations = sortingAlgorithms.shuffle(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            },i * ANIMATION_SPEED_IN_MS);
          
        }
      
    }

    linearSearch = () => {
        const target = Math.floor(Math.random(5, 300));
        const animations = sortingAlgorithms.getLinearSearchAnimations(this.state.array, target);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, identifier] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const color = identifier === -1 ? FOUND_COLOR : SEARCHING_COLOR;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
            }, i * 100);
        }   
    }

    binarySearch = () => {
        const target = Math.floor(Math.random(5, 730));
        const animations = sortingAlgorithms.getBinarySearchAnimations(this.state.array, target);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, identifier] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const color = identifier === -1 ? FOUND_COLOR : SECONDARY_COLOR;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_IN_MS);

        }
    }

    // render method the images of bars representing each value of the array
    render () {
        const {array} = this.state;

        return (
            // create div called array container which stores all array bars
            <div className = "array-container">
            {array.map((value, idx) => (
                // div array bar which is styled such that value represents height in pixels
                <div
                className="array-bar"
                key={idx}
                style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                width: `${WIDTH}px`,
                borderRadius: 4,
                }}></div>
            ))}
            <div className = "footer" style = {{backgroundColor: 'grey', borderRadius: 4, padding: 2}} >
                <button className = "button" onClick = {() => this.resetArray()}>Generate New Array</button>
                <button className = "button" onClick = {() => this.mergeSort()}>Merge Sort</button>
                <button className = "button" onClick = {() => this.quickSort()}>Quick Sort</button>
                <button className = "button" onClick = {() => this.heapSort()}>Heap Sort</button>
                <button className = "button" onClick = {() => this.bubbleSort()}>Bubble Sort</button>
                <button className = "button" onClick = {() => this.insertionSort()}>Insertion Sort</button>
                <button className = "button" onClick = {() => this.selectionSort()}>Selection Sort</button>
                <button className = "button" onClick = {() => this.linearSearch()}>Linear Search</button>
                <button className = "button" onClick = {() => this.binarySearch()}>Binary Search</button>
                <button className = "button" onClick = {() => this.shuffle()}>Shuffle</button>
            </div>
            
            </div>
            // create all buttons which will call functions traced back to the component.
        );
    }

}


// return random number between a min and max value
function randomIntFromIntervals(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}







