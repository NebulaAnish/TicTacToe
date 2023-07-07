const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
let circleTurn;
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
const winningMessage = document.getElementById("winningMessage")
const restartBtn = document.getElementById("restartButton")
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];


startGame()
restartBtn.addEventListener("click", startGame)



function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessage.classList.remove('show')
}



function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placemark(cell, currentClass);
    // placeMark
    // check for win
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    }
    else {
        swapTurns()
        setBoardHoverClass()
    }

}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Draw !"

    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`

    }
    winningMessage.classList.add("show")
}
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placemark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return winConditions.some(condition => {
        return condition.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}


function resartGame() {

}