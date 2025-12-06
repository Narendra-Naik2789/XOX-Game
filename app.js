// Selecting elements
let btns = document.querySelectorAll(".container div");
let result = document.querySelector(".textshow");

let currentPlayer = "X";   // true = X, false = O
let gameStart = false;
let moveCount = 0;

// All Winning Patterns
const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],        // Rows
  [0,3,6],[1,4,7],[2,5,8],        // Columns
  [0,4,8],[2,4,6]                 // Diagonals
];

// Initial Screen Lock
startScreen();

// Disable clicks until game starts
function startScreen() {
  btns.forEach(btn => btn.style.pointerEvents = "none");
  result.style.color = "black";
  result.innerText = "Press any key to start the game";

  // Start game on first key press
  document.addEventListener("keydown", startGameOnce, { once: true });
}

// Unlock board & begin game
function startGameOnce() {
  gameStart = true;
  result.innerText = "Game is in progress!";
  btns.forEach(btn => btn.style.pointerEvents = "auto");
}

// Main Click Logic
btns.forEach(btn => {
  btn.addEventListener("click", () => {

    if (!gameStart || btn.innerText !== "") return;

    btn.textContent = currentPlayer;  // Fill X or O
    moveCount++;

    // Switch Player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    // Check Winner after minimum moves
    if (moveCount >= 5) checkWinner();
  });
});

// Winner / Draw Check
function checkWinner() {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;

    if (
      btns[a].innerText !== "" &&
      btns[a].innerText === btns[b].innerText &&
      btns[b].innerText === btns[c].innerText
    ) {
      return showWinner(btns[a].innerText);
    }
  }

  // If board filled and no winner
  if (moveCount === 9) showDraw();
}

function screenAnimation(color) {
  document.body.classList.add(`${color}`);
  setTimeout(() => {
    document.body.classList.remove(`${color}`);
  }, 300);
}

// Winner Function
function showWinner(player) {
  btns.forEach(btn => btn.style.pointerEvents = "none");
  screenAnimation("green-screen");
  result.innerHTML = `🎉 Winner: ${player} 🏆<br><span>Press any key to restart</span>`;
  result.style.color = "green";

  document.addEventListener("keydown", resetGame, { once: true });
}

// Draw Function
function showDraw() {
  btns.forEach(btn => btn.style.pointerEvents = "none");
  screenAnimation("red-screen");
  result.innerHTML = `🤝 It's a Draw!<br><span>Press any key to restart</span>`;
  result.style.color = "orange";

  document.addEventListener("keydown", resetGame, { once: true });
}

// Reset Game
function resetGame() {
  moveCount = 0;
  currentPlayer = "X";
  gameStart = true;

  btns.forEach(btn => {
    btn.innerText = "";
    btn.style.pointerEvents = "auto";
  });

  result.innerText = "Game is in progress!";
  result.style.color = "black";
}


//currently not using this checkwinner as we now using optimizedcheckwinner() currently , this is only for reference

function checkWinnerold() {
  if (
    btns[0].innerText !== "" &&
    btns[0].innerText === btns[1].innerText &&
    btns[1].innerText === btns[2].innerText
  ) {
    winner(btns[0].innerText);
  } else if (
    btns[3].innerText !== "" &&
    btns[3].innerText === btns[4].innerText &&
    btns[4].innerText === btns[5].innerText
  ) {
    winner(btns[3].innerText);
  } else if (
    btns[6].innerText !== "" &&
    btns[6].innerText === btns[7].innerText &&
    btns[7].innerText === btns[8].innerText
  ) {
    winner(btns[6].innerText);
  } else if (
    btns[0].innerText !== "" &&
    btns[0].innerText === btns[3].innerText &&
    btns[3].innerText === btns[6].innerText
  ) {
    winner(btns[0].innerText);
  } else if (
    btns[1].innerText !== "" &&
    btns[1].innerText === btns[4].innerText &&
    btns[4].innerText === btns[7].innerText
  ) {
    winner(btns[1].innerText);
  } else if (
    btns[2].innerText !== "" &&
    btns[2].innerText === btns[5].innerText &&
    btns[5].innerText === btns[8].innerText
  ) {
    winner(btns[2].innerText);
  } else if (
    btns[0].innerText !== "" &&
    btns[0].innerText === btns[4].innerText &&
    btns[4].innerText === btns[8].innerText
  ) {
    winner(btns[0].innerText);
  } else if (
    btns[2].innerText !== "" &&
    btns[2].innerText === btns[4].innerText &&
    btns[4].innerText === btns[6].innerText
  ) {
    winner(btns[2].innerText);
  } else if (count === 9) {
    draw();
  }
}