// Functions for the operations
function addition (a, b) {
    return a + b;
}

function subtraction (a, b) {
    return a - b;
}

function division (a, b) {
    if (b !== 0) {
        return a / b;
    } else {
        console.log("0 division is not possible.");
        return "0 division is not possible";
    }
}

function multiplication (a, b) {
    return a * b;
}

function modulo (a, b) {
    return a % b;
}

let numberArray = [];
let operator;
let currentNumber = "";
let previousOperator;

const operationDisplay = document.querySelector("#operation_display");
const resultDisplay = document.querySelector("#result_display");
const keyboard = document.querySelector("#keyboard");

// Number buttons functions
function addNumberToCurrentNumber(event) {
    if (numberArray.length === 1 && !operator) {
        numberArray = [];
    }
    if (numberArray.length < 2 ) {
        currentNumber += event.target.textContent;
    } /* else if (numberArray.length === 2) {
        numberArray = [convertStringToNumber(currentNumber)];
        currentNumber = "" + event.target.textContent;
    } else {
        console.log("Error! There can't be more than two numbers in the number array!");
        printAllThree();
    } */
}
// Point button functions
function addPointToCurrentNumber() {
    if (currentNumber) {
        if (currentNumber.includes(".") === false) {
            currentNumber += ".";
        } else {
            console.log("There is already a decimal point in the current number");
        }
    } else {
        console.log("Please, input a number first.");
    }
    
}
// Function that converts the string number to either a float or an integer number and returns it
function convertStringToNumber(string) {
    let stringToParse = string;
    currentNumber = "";
    if (string.includes(".") === true) {
        let parsedFloat = parseFloat(stringToParse);
        numberArray.push(parsedFloat);
        return parsedFloat;
    } else if (string === "" || string === ".") {
        return 0;
    } else {
        let parsedInteger = parseInt(stringToParse);
        numberArray.push(parsedInteger);
        return parsedInteger;
    }
}

// Function that chooses the appropriate operation
function doTheOperation(simbol) {
    let result;
    switch (simbol) {
        case "+":
            result = addition(numberArray[0], numberArray[1]);
            break;
        case "-":
            result = subtraction(numberArray[0], numberArray[1]);
            break;
        case "*":
            result = multiplication(numberArray[0], numberArray[1]);
            break;
        case "/":
            result = division(numberArray[0], numberArray[1]);
            break;
        case "%":
            result = modulo(numberArray[0], numberArray[1]);
            break;
        default:
            console.log("The distinguish Operation function is not functioning.")
    };
    return result;
}

// Function that prints the current number
function printCurrentNumber() {
    console.log(`The current number is: ${currentNumber}`);
}
// Function that prints the number array
function printNumberArray() {
    console.log(`The number array is: ${numberArray}`);
}
// Function that prints the operator
function printOperator() {
    console.log(`The operator is: ${operator}`);
}
// Function that prints all three
function printAllThree() {
    printCurrentNumber();
    printNumberArray();
    printOperator();
}

// Function that operators
function onOperatorButtonClick(event) {
    if (numberArray.length === 0) {
        if (currentNumber) {
            convertStringToNumber(currentNumber);
            operator = event.target.textContent;
            printAllThree();
        } else {
            console.log("First, you have to input a number.");
            operator = "";
            printAllThree();
        };
    } else if (numberArray.length === 1) {
        if (currentNumber) {
            convertStringToNumber(currentNumber);
            currentNumber = doTheOperation(operator).toString();
            operator = event.target.textContent;
            numberArray = [convertStringToNumber(currentNumber)];
            printAllThree();
        } else {
            operator = event.target.textContent;
            printAllThree();
        }
    } else if (numberArray.length === 2) {
        operator = event.target.textContent;
        let result = doTheOperation(operator);
        numberArray = [];
        numberArray.push(result);
        currentNumber = result.toString();
        printAllThree();
    }
}
// Function
function printToDisplay() {
    if (currentNumber) {
        resultDisplay.textContent = currentNumber;
    } else {
        resultDisplay.textContent = "0";
    };
    if (numberArray.length === 1) {
        if (operator) {
            operationDisplay.textContent = `${numberArray[0].toString()} ${operator}`;
        } else {
            operationDisplay.textContent = `${numberArray[0].toString()}`;
        }
    } else if (numberArray.length === 2) {
        operationDisplay.textContent = `${numberArray[0].toString()} ${operator} ${numberArray[1].toString()}`;
    } else if (numberArray.length === 0) {
        operationDisplay.textContent = "";
    }
}
// Keyboard event listener with event delegation
keyboard.addEventListener("click", (event) => {
    // Number button event listener 
    if (event.target.classList.contains("number_button") === true) {
        addNumberToCurrentNumber(event);
    } else if (event.target.classList.contains("del_button") === true) {
        numberArray = [];
        currentNumber = "";
    } else if (event.target.classList.contains("point_button") === true) {
        addPointToCurrentNumber();
    } else if (event.target.id === "equal") {
        if (currentNumber /* && currentNumber != 0 */) {
            convertStringToNumber(currentNumber);
        }
        if (numberArray.length === 2) {
            /* currentNumber = doTheOperation(operator).toString();
            console.log(currentNumber);
            numberArray = [convertStringToNumber(currentNumber)]; */
            if (numberArray[1] !== 0) {
                numberArray = [doTheOperation(operator)];
                printAllThree();
                operator = "";
            } else {
                currentNumber = doTheOperation(operator);
                printAllThree();
                /* numberArray = numberArray.slice(0,-1); */
            }
        }
    } else if (event.target.classList.contains("operator_button") === true) {
        onOperatorButtonClick(event);
    } else if (event.target.classList.contains("ac_button") === true) {
        currentNumber = currentNumber.slice(0, -1);
    }
    printToDisplay();
})