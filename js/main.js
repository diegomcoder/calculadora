const validOperators = ['+','-','*','/']

function isValidNumber(command) {
    return parseInt(command) >= 0 && parseInt(command) <= 9
}

function isValidOperator(command) {
    return validOperators.some((item)=> item == command)
}


window.addEventListener('keyup', function (e) {
    const keyPressed = e.key

    if (isValidOperator(keyPressed))
        console.log('The command is an operator');
    else if (isValidNumber(keyPressed))
        console.log('The command is a number')
})

window.addEventListener('click', function (e) {
    const elementClicked = e.target
    const keyPressed = elementClicked.dataset.command

    if (isValidOperator(keyPressed))
        console.log('The command is an operator');
    else if (isValidNumber(keyPressed))
        console.log('The command is a number')
})