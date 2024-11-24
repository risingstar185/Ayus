const boxes = document.querySelectorAll('.box');
const msgContainer = document.querySelector('.msg-container');
const msgText = document.getElementById('msg');
const newBtn = document.getElementById('new-btn');
const resetBtn = document.getElementById('reset-btn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Check for a winner
function checkWinner() {
  for (let [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      msgText.textContent = `${currentPlayer} Wins!`;
      msgContainer.classList.add('show');
      return;
    }
  }

  // Check for draw
  if (!board.includes('')) {
    gameActive = false;
    msgText.textContent = "It's a Draw!";
    msgContainer.classList.add('show');
  }
}

// Handle box click
function handleBoxClick(index) {
  if (board[index] || !gameActive) return;
  board[index] = currentPlayer;
  boxes[index].textContent = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  checkWinner();
}

// Reset game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  boxes.forEach(box => box.textContent = '');
  msgContainer.classList.remove('show');
}

// New game button click
newBtn.addEventListener('click', resetGame);

// Reset button click
resetBtn.addEventListener('click', resetGame);

// Add click event listeners to each box
boxes.forEach((box, index) => {
  box.addEventListener('click', () => handleBoxClick(index));
});
