const guessBtn = document.getElementById('guess')
const resetBtn = document.getElementById('reset')

const gameBoard = document.querySelector('.container .display')
const gameOver = document.querySelector('.container .display.gameOver')
const guessBox = document.getElementById('digitCode')

const triesLeft = document.getElementById('tries')
const correctElement = document.getElementById('correct')
const wrongElement = document.getElementById('wrong')

// Global variables
let tries = 12

// functions
function generate(){
    
    function check_duplicate(num, list){
        let flag_duplicate = false
        for (let index = 0; index < list.length; index++) {
            if (num.toString() === list[index]) {
                flag_duplicate = true
            }
        }
        return flag_duplicate
    }

    let code = ''
    let gen_int = 0

    while (code.length !== 4){
        gen_int = Math.floor(Math.random() * 9)
        if (check_duplicate(gen_int, code) === false && gen_int !== 0) {
            code += gen_int.toString()
        }
    }
    return code
}

function errorMessage(message) {
    const errorBox = document.getElementById('error')

    errorBox.textContent = message
    errorBox.classList.remove('hide')

    setTimeout(() => {

        errorBox.textContent = message
        errorBox.classList.add('hide')
        
    }, 4000);

}


function check_position(guess,genCodeStr) {

    let correct = 0
    let wrong = 0

    function checkInString(reqGuess, reqCode) {
        let flag_duplicate = false
        for (let index = 0; index < reqCode.length; index++) {
            if (reqGuess.toString() === reqCode[index]) {
                flag_duplicate = true
            }
        }
        return flag_duplicate
    }

    for (let index = 0; index < genCodeStr.length; index++) {
        if (guess[index] === genCodeStr[index]) {
            correct += 1
        }else if (checkInString(guess[index], genCodeStr) === true && guess[index] !== genCodeStr[index]) {
            wrong += 1
        }
    }

    return {
        'correct': correct,
        'wrong': wrong
    }

}

const req_code = generate()
console.log(req_code)

function reset(e) {
    e.preventDefault()

    tries = 12
    gameBoard.style.display = 'unset'
    gameOver.style.display = 'none'
    resetBtn.classList.add('hide')
    guessBtn.classList.remove('hide')


}

function runGame(e) {

    e.preventDefault()


    if (tries === 1) {
        gameBoard.style.display = 'none'
        gameOver.style.display = 'unset'
        resetBtn.classList.remove('hide')
        guessBtn.classList.add('hide')
    }

    if (guessBox.value == '') {

        errorMessage('Please enter numbers')

    }else if (guessBox.value.length > 4 || guessBox.value.length < 4) {

        errorMessage('Numbers are out of range make sure to enter only 4 numbers')

    }else {

        if (req_code === guessBox.value) {

            gameBoard.style.display = 'none'
            gameOver.style.display = 'unset'
    
        }else{
    
            const { correct, wrong } = check_position(guessBox.value, req_code)
    
            tries -= 1
            triesLeft.textContent = `${tries} tries left`
            correctElement.textContent = `Number of correct digits in correct place: ${correct}`
            wrongElement.textContent = `Number of correct digits not in correct place: ${wrong}`
            guessBox.textContent = ''
        }

    }


}


// Event functions

guessBtn.addEventListener('click', runGame)
resetBtn.addEventListener('click', reset)



