import { backend } from 'declarations/backend';

const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let currentPlayer = true;
let gameOver = false;

async function initGame() {
    await renderBoard();
    updateStatus();
}

async function renderBoard() {
    const cells = await backend.getBoard();
    board.innerHTML = '';
    cells.forEach((row, i) => {
        row.forEach((cell, j) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.row = i;
            cellElement.dataset.col = j;
            cellElement.textContent = cell === null ? '' : (cell ? 'X' : 'O');
            cellElement.addEventListener('click', handleCellClick);
            board.appendChild(cellElement);
        });
    });
}

async function handleCellClick(event) {
    if (gameOver) return;

    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    const moveSuccess = await backend.makeMove(row, col);
    if (moveSuccess) {
        await renderBoard();
        gameOver = await backend.isGameOver();
        currentPlayer = await backend.getCurrentPlayer();
        updateStatus();
    }
}

async function updateStatus() {
    if (gameOver) {
        const winner = !currentPlayer ? 'X' : 'O';
        status.textContent = `Player ${winner} wins!`;
    } else {
        status.textContent = `Current player: ${currentPlayer ? 'X' : 'O'}`;
    }
}

resetButton.addEventListener('click', async () => {
    await backend.resetGame();
    gameOver = false;
    currentPlayer = true;
    await initGame();
});

initGame();
