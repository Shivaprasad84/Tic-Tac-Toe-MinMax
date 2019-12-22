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
  if (board[i][j] == "") {
    let cell = document.getElementById(id.toString());
    cell.innerText = player;
    board[i][j] = player;
    gameStatus(i, j);
    if (!gameOver) {
      let num = computerMove();
      let x = Math.floor(num / 3);
      let y = num % 3;
      gameStatus();
    }
  }
}

function computerMove() {
  if (checkWinner() !== null) return;
  let num = Math.floor(Math.random() * 9);
  let i = Math.floor(num / 3);
  let j = num % 3;
  while (board[i][j] !== "") {
    num = Math.floor(Math.random() * 9);
    i = Math.floor(num / 3);
    j = num % 3;
  }
  board[i][j] = computer;
  let cell = document.getElementById(num.toString());
  cell.innerText = computer;
  return num;
}

function equals3(a, b, c) {
  return a == b && b == c && a !== "";
}

function colorWin() {
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

function gameStatus() {
  // Check for winner
  let state = checkWinner();
  if (state == null) return;
  if (state == "X") {
    msg.innerText = "You Win!";
  } else if (state == "O") {
    msg.innerText = "Computer Wins!";
  } else if (state == "tie") {
    msg.innerText = "It's a draw";
  }
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
}

function checkWinner() {
  let winner = null;
  // Horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
      gameOver = true;
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
      gameOver = true;
    }
  }

  // Diagonals
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
    gameOver = true;
  }

  if (equals3(board[0][2], board[1][1], board[2][0])) {
    winner = board[0][2];
    gameOver = true;
  }

  colorWin();

  // For Draw
  let availableSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      availableSpots++;
    }
  }

  if (winner == null && availableSpots == 0) {
    gameOver = true;
    return "tie";
  } else {
    return winner;
  }
}

function reset() {
  window.location.reload();
}
