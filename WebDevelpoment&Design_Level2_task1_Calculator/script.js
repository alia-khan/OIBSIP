// ================== ELEMENTS ==================

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

// ================== VARIABLES ==================

let firstNumber = "";
let secondNumber = "";
let operator = "";
let shouldResetDisplay = false;

// ================== DISPLAY ==================

function updateDisplay(value) {
    display.textContent = value || "0";
}

// ================== CALCULATOR LOGIC ==================

function calculate(a, b, op) {

    a = parseFloat(a);
    b = parseFloat(b);

    switch (op) {

        case "+":
            return a + b;

        case "-":
            return a - b;

        case "×":
            return a * b;

        case "÷":
            if (b === 0) {
                return "Error";
            }
            return a / b;

        default:
            return b;
    }
}

// ================== NUMBER INPUT ==================

function handleNumber(number) {

    if (shouldResetDisplay) {

        updateDisplay(`${firstNumber} ${operator} ${number}`);
        shouldResetDisplay = false;
        return;
    }

    let current = display.textContent;

    if (current === "0") {
        current = "";
    }

    // Prevent multiple decimal points
    const parts = current.split(" ");
    const lastPart = parts[parts.length - 1];

    if (number === "." && lastPart.includes(".")) {
        return;
    }

    updateDisplay(current + number);
}

// ================== OPERATOR INPUT ==================

function handleOperator(newOperator) {

    if (operator !== "" && !shouldResetDisplay) {

        secondNumber = display.textContent.split(" ").pop();

        const result = calculate(
            firstNumber,
            secondNumber,
            operator
        );

        if (result === "Error") {

            updateDisplay("Cannot divide by 0");
            resetCalculator();
            return;
        }

        firstNumber = result.toString();

    } else {

        firstNumber = display.textContent;
    }

    operator = newOperator;
    shouldResetDisplay = true;

    updateDisplay(`${firstNumber} ${operator}`);
}

// ================== EQUALS ==================

function handleEquals() {

    if (operator === "") return;

    secondNumber = display.textContent.split(" ").pop();

    const result = calculate(
        firstNumber,
        secondNumber,
        operator
    );

    if (result === "Error") {

        updateDisplay("Cannot divide by 0");
        resetCalculator();
        return;
    }

    updateDisplay(result);

    firstNumber = result.toString();
    operator = "";
    shouldResetDisplay = true;
}

// ================== CLEAR ==================

function resetCalculator() {

    firstNumber = "";
    secondNumber = "";
    operator = "";
    shouldResetDisplay = false;
}

// ================== BACKSPACE ==================

function handleBackspace() {

    if (shouldResetDisplay) return;

    let current = display.textContent;

    if (current.length <= 1) {

        updateDisplay("0");

    } else {

        updateDisplay(current.slice(0, -1));
    }
}

// ================== EVENT LISTENERS ==================
// Required by the assignment:
// No inline onclick attributes are used.

buttons.forEach(button => {

    button.addEventListener("click", function () {

        const number = button.dataset.number;
        const op = button.dataset.operator;
        const action = button.dataset.action;

        if (number !== undefined) {

            handleNumber(number);

        }

        else if (op !== undefined) {

            handleOperator(op);

        }

        else if (action === "equals") {

            handleEquals();

        }

        else if (action === "clear") {

            resetCalculator();
            updateDisplay("0");

        }

        else if (action === "back") {

            handleBackspace();

        }

    });

});