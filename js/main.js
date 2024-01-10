const DISPLAY = $('.display-digits')[0];

const isNumber = new RegExp("^[0-9]{1}$")
const isOperator = new RegExp("^[+*-/]{1}$")
const isCommand = new RegExp("\b^Enter$|^Backspace$|^=$|^c$|")
const ACCEPTED_KEYS = ' 0 1 2 3 4 5 6 7 8 9 0 + - * / % = Backspace Enter , '
const OPERATOR_SIGNS = '+-*/'

function checkEvent(e) {
    let BTN = null;

    if (e.type == 'keyup' && ACCEPTED_KEYS.includes(` ${e.key} `))
        BTN = e.key;
    else if (e.type == 'click' && e.target.nodeName == 'BUTTON')
        BTN = e.target.dataset.command
    else return;

    if ("0123456789".includes(BTN))  return handleNumberBtn(BTN);
    if ("+-*/".includes(BTN))  return handleOperationBtn(BTN);
    if (BTN == 'Backspace') return handleBackspaceBtn();
    if (BTN == ',') return handleCommaBtn();
    if (BTN == 'c') return handleClearBtn();
    if (BTN == 'dz') return handleDoubleZeroBtn();
    if (BTN == 'Enter' || BTN == '=') handleCalculateBtn();
    //if ("c%Backspace".includes(BTN)) return 0;
}

function handleNumberBtn(value) {
    if (DISPLAY.innerText == 0 && value == 0) return;
    
    if (DISPLAY.innerText == 0) {
        DISPLAY.innerText = value;
    } else {
        if (OPERATOR_SIGNS.includes(DISPLAY.innerText.slice(-1))) {
            DISPLAY.innerText += ` ${value}`;
        } else
        DISPLAY.innerText += value;
    }

    if (DISPLAY.innerText.length > 34) {
        DISPLAY.setAttribute('class', 'display-digits small')
    }
}

function handleOperationBtn(sign) {
    if (DISPLAY.innerText == 0) return;

    if (OPERATOR_SIGNS.includes(DISPLAY.innerText.slice(-1))) {
        DISPLAY.innerText = DISPLAY.innerText.slice(0, -1) + sign;
    } else if (DISPLAY.innerText.slice(-1) == ',') {
        DISPLAY.innerText += `0 ${sign}`
    } else {
        DISPLAY.innerText += ` ${sign}`
    }
}

function handleBackspaceBtn() {
    if (DISPLAY.innerText.length >= 1) {
        if (OPERATOR_SIGNS.includes(DISPLAY.innerText.slice(-1))) {
            DISPLAY.innerText = DISPLAY.innerText.slice(0, -2)
        } else if (DISPLAY.innerText.length > 1) {
            DISPLAY.innerText = DISPLAY.innerText.slice(0, -1)
        } else if (DISPLAY.innerText.length == 1 && DISPLAY.innerText.slice(-1) != 0) {
            DISPLAY.innerText = 0
        }
    }
}

function handleCommaBtn() {
    if (DISPLAY.innerText == 0) {
        DISPLAY.innerText += ','
    } else if (OPERATOR_SIGNS.includes(DISPLAY.innerText.slice(-1))) {
        DISPLAY.innerText += '0,'
    } else if (!lastIsFloatingPointValue()) {
        DISPLAY.innerText += ','
    }
}

function handleClearBtn() {
    DISPLAY.innerText = 0;
}

function handleDoubleZeroBtn() {
    if (DISPLAY.innerText == 0) return;
    if (OPERATOR_SIGNS.includes(DISPLAY.innerText.slice(-1))) return;
    DISPLAY.innerText += '00';
}

function handleCalculateBtn() {
    let CALCULUS = DISPLAY.innerText.replaceAll(',', '.');
    if (CALCULUS.length > 1 && OPERATOR_SIGNS.includes(CALCULUS.slice(-1))) {
        CALCULUS = CALCULUS.slice(0, -2)
    }

    if (OPERATOR_SIGNS.includes)
    console.log(CALCULUS);

}

function lastIsFloatingPointValue() {
    let result = false;
    const DISPLAY_CONTENT = DISPLAY.innerText;

    for (let i = DISPLAY_CONTENT.length; i>0 ; i--) {
        if (DISPLAY_CONTENT[i] == ',') {
            result = true;
            break;
        } else if (OPERATOR_SIGNS.includes(DISPLAY_CONTENT[i]))
            break;
    }
    return result;
}

$(window).on('click', e => checkEvent(e))

$(window).on('keyup', e => checkEvent(e))

/*

REGRAS
- displayContent

- accumulator =>
    armazena números e operadores

- number =>
    armazena somente números

- operatorSign



/*
let result = 0

function updateDisplay() {
    DISPLAY.innerText = result
}

function appendNumber(input) {
    if (result == 0) result = input
    else result += input
}

function calculate(input) {
    if (result != 0) result += input
}

function getResult() {
    if (result == 0) return
    let currentNumber = 0
    let operator = ""
    let partialResult = 0

    for (let i = 0; i < result.length; i++) {
        
        if (isNumber.test(result[i])) {
            currentNumber += result[i]
        } else if (isOperator.test(result[i]) && partialResult == 0) {
            operator = result[i]
            partialResult = parseInt(currentNumber)
            currentNumber = ""
        } else if (operator == "+" && i < result.length -1) {
            operator = result[i]
            partialResult = parseInt(partialResult) + parseInt(currentNumber)
            currentNumber = 0
        } else if (operator == "-" && i < result.length -1) {
            operator = result[i]
            partialResult = parseInt(partialResult) - parseInt(currentNumber)
            currentNumber = 0
        } else if (operator == "*" && i < result.length -1) {
            operator = result[i]
            partialResult = parseInt(partialResult) * parseInt(currentNumber)
            currentNumber = 0
        } else if (operator == "/" && i < result.length -1) {
            operator = result[i]
            partialResult = parseInt(partialResult) / parseInt(currentNumber)
            currentNumber = 0
        }
        
        if (i == result.length -1) {
            if (operator == "+") {
                partialResult = parseInt(partialResult) + parseInt(currentNumber)
                operator = ""
            } else if (operator == "-") {
                partialResult = parseInt(partialResult) - parseInt(currentNumber)
                operator = ""
            } else if (operator == "*") {
                partialResult = parseInt(partialResult) * parseInt(currentNumber)
                operator = ""
            } else if (operator == "/") {
                partialResult = parseInt(partialResult) / parseInt(currentNumber)
                operator = ""
            }
        }
    }
    
    result = partialResult
}

function checkInput(input) {
    if (isNumber.test(input)) {
        appendNumber(input)
    } else if (isOperator.test(input)) {
        calculate(input)
    } else if (isCommand.test(input) && (input == "Enter" || input == "=")) {
        getResult()
    }

    updateDisplay()
}

function backspace(input) {
    const resultLength = result.toString().length

    if (input == 'Backspace' && resultLength > 1) {
        result = parseInt(result.toString().slice(0, resultLength -1))
        
    } else if (input == 'Backspace' && result != '0') {
        result = '0'

    }

    updateDisplay()
}

function clear(input) {
    if (input == 'c')
        result = 0

    updateDisplay()
}


window.addEventListener('keyup', function (e) {
    const keyPressed = e.key

    checkInput(keyPressed)
    backspace(keyPressed)
})

window.addEventListener('click', function (e) {
    const elementClicked = e.target
    const keyPressed = elementClicked.dataset.command

    checkInput(keyPressed)
    backspace(keyPressed)
    clear(keyPressed)
})
*/