// Initializations

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

let first, second;
let player = "X";
let computer = "O";

let gameOver = false;

let msg = document.getElementById("Intro");

let tab = document.getElementById("board");
tab.addEventListener("click", placeMarker);

// Choose first player

if (Math.random() < 0.5) {
  first = player;
  second = computer;
} else {
  first = computer;
  second = player;
}

// display who plays first
if (first == player) {
  msg.innerText = "You : 'X' play first";
} else {
  msg.innerText = "Computer : 'O' plays first";
  computerMove();
}

function placeMarker(e) {
  let id = e.target.id;
  let i = Math.floor(id / 3);
  let j = id % 3;
  if (!isOccupied(i, j)) {
    let cell = document.getElementById(id.toString());
    cell.innerText = player;
    board[i][j] = player;
    gameStatus(i, j);
    if (!gameOver) {
      let num = computerMove();
      let x = Math.floor(num / 3);
      let y = num % 3;
      gameStatus(x, y);
    }
  }
}

function computerMove() {
  if (checkDraw() || checkWin()) return;
  let num = Math.floor(Math.random() * 9);
  let i = Math.floor(num / 3);
  let j = num % 3;
  while (isOccupied(i, j)) {
    num = Math.floor(Math.random() * 9);
    i = Math.floor(num / 3);
    j = num % 3;
  }
  board[i][j] = computer;
  let cell = document.getElementById(num.toString());
  cell.innerText = computer;
  return num;
}

function isOccupied(i, j) {
  return board[i][j] !== "";
}

function equals3(a, b, c) {
  return a == b && b == c && a !== "";
}

function colorWin() {
  let cell1, cell2, cell3;
  if (equals3(board[0][0], board[0][1], board[0][2])) {
    document.getElementById("0").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
    document.getElementById("1").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
    document.getElementById("2").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
  } else if (equals3(board[1][0], board[1][1], board[1][2])) {
    document.getElementById("3").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
    document.getElementById("4").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
    document.getElementById("5").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
  } else if (equals3(board[2][0], board[2][1], board[2][2])) {
    document.getElementById("6").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
    document.getElementById("7").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
    document.getElementById("8").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
  } else if (equals3(board[0][0], board[1][0], board[2][0])) {
    document.getElementById("0").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
    document.getElementById("3").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
    document.getElementById("6").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
  } else if (equals3(board[0][1], board[1][1], board[2][1])) {
    document.getElementById("1").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
    document.getElementById("4").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
    document.getElementById("7").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
  } else if (equals3(board[0][2], board[1][2], board[2][2])) {
    document.getElementById("2").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
    document.getElementById("5").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
    document.getElementById("8").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
  } else if (equals3(board[0][0], board[1][1], board[2][2])) {
    document.getElementById("0").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
    document.getElementById("4").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
    document.getElementById("8").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
  } else if (equals3(board[0][2], board[1][1], board[2][0])) {
    document.getElementById("2").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
    document.getElementById("4").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
    document.getElementById("6").style.backgroundColor =
      "rgb(77, 212, 77, 0.3)";
  }
}

function checkWin() {
  let win =
    // Horizontal
    equals3(board[0][0], board[0][1], board[0][2]) ||
    equals3(board[1][0], board[1][1], board[1][2]) ||
    equals3(board[2][0], board[2][1], board[2][2]) ||
    // Vertical
    equals3(board[0][0], board[1][0], board[2][0]) ||
    equals3(board[0][1], board[1][1], board[2][1]) ||
    equals3(board[0][2], board[1][2], board[2][2]) ||
    // Diagonals
    equals3(board[0][0], board[1][1], board[2][2]) ||
    equals3(board[0][2], board[1][1], board[2][0]);
  if (win) colorWin();
  return win;
}

function checkDraw() {
  let cnt = 0;
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (isOccupied(x, y)) {
        cnt++;
      }
    }
  }
  return cnt === 9;
}

function gameStatus(i, j) {
  // Check for winner
  if (checkWin()) {
    if (board[i][j] === player) {
      msg.innerText = "You Win";
      gameOver = true;
    } else if (board[i][j] === computer) {
      msg.innerText = "Computer Wins";
      gameOver = true;
    }
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
  }
  // Check for a draw
  if (checkDraw()) {
    msg.innerText = "It's a Tie!";
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
    gameOver = true;
  }
}

function reset() {
  window.location.reload();
}
