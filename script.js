// Functions for the operations
function addition (a, b) {
    return a + b;
}

function subtraction (a, b) {
    return a - b;
}

function division (a, b) {
    return a / b;
}

function multiplication (a, b) {
    return a * b;
}

function modulo (a, b) {
    return a % b;
}

let numberArray = [];
let operator;
let currentNumber;

const operationDisplay = document.querySelector("#operation_display");
const resultDisplau = document.querySelector("result_display");
const delButton = document.querySelector(".del_button");
const keyboard = document.querySelector("#keyboard");
// Number buttons event listeners
function addNumberToDisplay(event) {
    if ((numberArray.length <= 2 ) && (!currentNumber === undefined)) {
        if (!currentNumber.includes(".")){
            currentNumber += event.target.textContent;
            console.log(currentNumber);
        };
    } else {
        console.log("Error! There is something fishy going on here!");
        console.log(`The current number is: ${currentNumber}`)
    }
}

// Keyboard event listener with event delegation
keyboard.addEventListener("click", (event) => {
    // Number button event listener 
    if ((event.target.classList.contains("number_button") === true) || (event.target.classList.contains("point_button"))) {
        addNumberToDisplay(event);
    } else if (event.target.classList.contains("del_button") === true) {
        numberArray = [];
    };
})