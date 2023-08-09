const display = document.querySelector('.display-digits')
const isNumber = new RegExp("^[0-9]{1}$")
const isOperator = new RegExp("^[+*-/]{1}$")
const isCommand = new RegExp("\b^Enter$|^Backspace$|^=$|^c$|")
let result = 0

function updateDisplay() {
    display.innerText = result
}

function appendNumber(input) {
    if (result == 0 && input != 0){
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
    let num1
    let num2

    for (let i = 0; i < result.length; i++) {
        if (isNumber.test(result[i])) {
            num1 += result[i]
        }
    }
}

function checkInput(input) {
    if (isNumber.test(input)) {
        appendNumber(input)
    } else if (isOperator.test(input)) {
        calculate(input)
    } else if (isCommand.test(input)) {
        getResult()
    }

    updateDisplay()
}

function backspace(input) {
    if (input == 'Backspace' && result.length > 1) {
        result =result.slice(0, result.length -1)
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