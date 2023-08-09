const display = document.querySelector('.display-digits')
const isNumber = new RegExp("^[0-9]{1}$")
const isOperator = new RegExp("^[+*-/]{1}$")
const isCommand = new RegExp("\b^Enter$|^Backspace$|^=$|^c$|")
let result = 0

function updateDisplay() {
    display.innerText = result
}

function appendNumber(input) {
    if (result == 0){
        result = input
    } else {
        result += input
    }
}

function calculate(input) {
    if (result != 0) {
        result += input
    }
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