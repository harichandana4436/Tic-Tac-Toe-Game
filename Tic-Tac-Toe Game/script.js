document.addEventListener('DOMContentLoaded', function() {
    const gameScreen = document.getElementById('gameScreen');
    const resultScreen = document.getElementById('resultScreen');
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const resultMessage = document.getElementById('resultMessage');
    const restartBtn = document.getElementById('restartBtn');
    const newGameBtn = document.getElementById('newGameBtn');

    const X_CLASS = 'x';
    const O_CLASS = 'o';
    let currentPlayerClass = X_CLASS;
    let gameActive = true;
    let boardState = ['', '', '', '', '', '', '', '', '']; // Represents each cell of the board

    // Win combinations (indexes in the boardState array)
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Initialize the game board
    function initializeGame() {
        boardState = ['', '', '', '', '', '', '', '', ''];
        currentPlayerClass = X_CLASS;
        gameActive = true;
        gameScreen.style.display = 'block';
        resultScreen.style.display = 'none';
        message.innerText = 'Player X\'s turn';
        renderBoard();
    }

    // Render the game board dynamically
    function renderBoard() {
        board.innerHTML = '';
        boardState.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            if (cell !== '') {
                cellElement.innerText = cell;
                cellElement.classList.add(cell === X_CLASS ? X_CLASS : O_CLASS);
            }
            cellElement.addEventListener('click', () => cellClick(index));
            board.appendChild(cellElement);
        });
    }

    // Handle cell click
    function cellClick(index) {
        if (!gameActive || boardState[index] !== '') return;

        boardState[index] = currentPlayerClass;
        renderBoard();

        if (checkWin(currentPlayerClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
        }
    }

    // Check if the current player has won
    function checkWin(playerClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return boardState[index] === playerClass;
            });
        });
    }

    // Check if the game is a draw
    function isDraw() {
        return boardState.every(cell => {
            return cell !== '';
        });
    }

    // End the game
    function endGame(draw) {
        gameActive = false;
        if (draw) {
            resultMessage.innerText = 'It\'s a draw!';
        } else {
            resultMessage.innerText = `${currentPlayerClass === X_CLASS ? 'X' : 'O'} wins!`;
        }
        gameScreen.style.display = 'none';
        resultScreen.style.display = 'block';
    }

    // Switch turns between X and O
    function swapTurns() {
        currentPlayerClass = currentPlayerClass === X_CLASS ? O_CLASS : X_CLASS;
        message.innerText = `23Player ${currentPlayerClass === X_CLASS ? 'X' : 'O'}'s turn`;
    }

    // Restart game button event listener (on result screen)
    newGameBtn.addEventListener('click', initializeGame);

    // Initialize the game
    initializeGame();
});

