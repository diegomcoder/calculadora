const display = document.querySelector('.display-digits')
const validOperators = ['+','-','*','/']

function isValidNumber(command) {
    const isANumber = parseInt(command) >= 0 && parseInt(command) <= 9
    const displayIsClear = display.innerText == '0'

    if (isANumber && displayIsClear) {
        display.innerText = command
    } else if (isANumber) {
        display.innerText = display.innerText + command
    }
}

function isValidOperator(command) {
    if (validOperators.some((item)=> item == command)) {
        display.innerText = display.innerText + command
    }
}

function backspace(command) {
    const displayLenght = display.innerText.length

    if (command == 'Backspace' && displayLenght > 1) {
        display.innerText = display.innerText.slice(0, displayLenght -1)
    } else if (command == 'Backspace' && display.innerText != '0') {
        display.innerText = '0'
    }
}

function clear(command) {
    if (command == 'c')
        display.innerText = 0
}


window.addEventListener('keyup', function (e) {
    const keyPressed = e.key

    isValidOperator(keyPressed)
    isValidNumber(keyPressed)
    backspace(keyPressed)
})

window.addEventListener('click', function (e) {
    const elementClicked = e.target
    const keyPressed = elementClicked.dataset.command

    isValidOperator(keyPressed)
    isValidNumber(keyPressed)
    backspace(keyPressed)
    clear(keyPressed)
})