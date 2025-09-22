//your JS code here. If required.
let player1Name = '';
let player2Name = '';
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let cells = document.querySelectorAll('.cell');
let messageDiv = document.querySelector('.message');
let nameInputDiv = document.getElementById('name-input');
let gameBoardContainer = document.getElementById('game-board-container');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

document.getElementById('submit').addEventListener('click', () => {
    player1Name = document.getElementById('player1').value.trim();
    player2Name = document.getElementById('player2').value.trim();

    if (player1Name === '' || player2Name === '') {
        alert('Please enter names for both players.');
        return;
    }

    nameInputDiv.style.display = 'none';
    gameBoardContainer.style.display = 'block';
    updateMessage();
});

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellId = parseInt(clickedCell.id) - 1;

    if (board[clickedCellId] !== '' || !gameActive) {
        return;
    }

    board[clickedCellId] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    checkResult();
    if (gameActive) {
        switchPlayer();
        updateMessage();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateMessage() {
    if (gameActive) {
        let name = currentPlayer === 'X' ? player1Name : player2Name;
        messageDiv.innerHTML = `${name}, you're up!`;
    }
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        let winnerName = currentPlayer === 'X' ? player1Name : player2Name;
        messageDiv.innerHTML = `${winnerName} congratulations, you won!`;
        gameActive = false;
        disableCells();
        return;
    }

    let roundDraw = !board.includes('');
    if (roundDraw) {
        messageDiv.innerHTML = 'It\'s a Draw!';
        gameActive = false;
        return;
    }
}

function disableCells() {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
        cell.style.cursor = 'default';
    });
}
