// Single player Tic Tac Toe using minmax algorithm
// Author: Shivaprasad
// Date Created: 24/12/2019

// Initializations
let gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
let maxPlayer = "X";
let minPlayer = "O";
let win = null;

let msg = document.getElementById("Intro");
let tab = document.getElementById("board");
tab.addEventListener("click", humanMove);

// Place marker on selected cell and wait for computer to move
function humanMove(e) {
  let player = "X";
  let moveIndex = e.target.id;
  // if game is over return
  if (win || gameBoard[moveIndex] === "X" || gameBoard[moveIndex] === "O") {
    return;
  }
  let currentBoard = validMove(moveIndex, player, gameBoard);
  if (winner(currentBoard, player)) {
    gameBoard = currentBoard.slice(0);
    document.getElementById(moveIndex.toString()).innerText = player;
    win = player;
    colorWin();
    msg.innerText = "Game Over: You Win!";
    return;
  }
  if (tie(currentBoard)) {
    gameBoard = currentBoard.slice(0);
    document.getElementById(moveIndex.toString()).innerText = player;
    win = "D";
    colorWin();
    msg.innerText = "Game Over: It's a Tie!";
    return;
  }
  gameBoard = currentBoard.slice(0);
  document.getElementById(moveIndex.toString()).innerText = player;
  player = "O";
  moveIndex = findAiMove(currentBoard);
  currentBoard = validMove(moveIndex, player, currentBoard);
  if (winner(currentBoard, player)) {
    gameBoard = currentBoard.slice(0);
    document.getElementById(moveIndex.toString()).innerText = player;
    win = player;
    colorWin();
    msg.innerText = "Game Over: Computer Wins!";
    return;
  }
  if (tie(currentBoard)) {
    gameBoard = currentBoard.slice(0);
    document.getElementById(moveIndex.toString()).innerText = player;
    win = "D";
    colorWin();
    msg.innerText = "Game Over: It's a Tie!";
    return;
  }
  gameBoard = currentBoard.slice(0);
  document.getElementById(moveIndex.toString()).innerText = player;
}

function equals3(a, b, c) {
  return a === b && b === c && a !== " ";
}

function colorWin() {
  // Rows
  for (let i = 0; i < 3; i++) {
    if (equals3(gameBoard[3 * i], gameBoard[3 * i + 1], gameBoard[3 * i + 2])) {
      document.getElementById(3 * i.toString()).style.backgroundColor =
        "rgba(0, 255, 0, 0.2)";
      document.getElementById((3 * i + 1).toString()).style.backgroundColor =
        "rgba(0, 255, 0, 0.2)";
      document.getElementById((3 * i + 2).toString()).style.backgroundColor =
        "rgba(0, 255, 0, 0.2)";
      return;
    }
  }

  // Columns
  for (let i = 0; i < 3; i++) {
    if (equals3(gameBoard[i], gameBoard[i + 3], gameBoard[i + 6])) {
      document.getElementById(i.toString()).style.backgroundColor =
        "rgba(0, 255, 0, 0.2)";
      document.getElementById((i + 3).toString()).style.backgroundColor =
        "rgba(0, 255, 0, 0.2)";
      document.getElementById((i + 6).toString()).style.backgroundColor =
        "rgba(0, 255, 0, 0.2)";
      return;
    }
  }

  // Diagonals
  if (equals3(gameBoard[0], gameBoard[4], gameBoard[8])) {
    document.getElementById("0").style.backgroundColor = "rgba(0, 255, 0, 0.2)";
    document.getElementById("4").style.backgroundColor = "rgba(0, 255, 0, 0.2)";
    document.getElementById("8").style.backgroundColor = "rgba(0, 255, 0, 0.2)";
    return;
  }

  if (equals3(gameBoard[2], gameBoard[4], gameBoard[6])) {
    document.getElementById("2").style.backgroundColor = "rgba(0, 255, 0, 0.2)";
    document.getElementById("4").style.backgroundColor = "rgba(0, 255, 0, 0.2)";
    document.getElementById("6").style.backgroundColor = "rgba(0, 255, 0, 0.2)";
    return;
  }

  for (let i = 0; i < gameBoard.length; i++) {
    let cell = document.getElementById(i.toString());
    cell.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
  }
}

function winner(board, player) {
  if (
    (board[0] === player && board[1] === player && board[2] === player) ||
    (board[3] === player && board[4] === player && board[5] === player) ||
    (board[6] === player && board[7] === player && board[8] === player) ||
    (board[0] === player && board[3] === player && board[6] === player) ||
    (board[1] === player && board[4] === player && board[7] === player) ||
    (board[2] === player && board[5] === player && board[8] === player) ||
    (board[0] === player && board[4] === player && board[8] === player) ||
    (board[2] === player && board[4] === player && board[6] === player)
  ) {
    return true;
  } else {
    return null;
  }
}

function tie(board) {
  let moves = board.join("").replace(/ /g, "");
  if (moves.length === 9) {
    return true;
  }
  return false;
}

function validMove(move, player, board) {
  let newBoard = board.slice(0);
  if (newBoard[move] === " ") {
    newBoard[move] = player;
    return newBoard;
  } else {
    return null;
  }
}

function findAiMove(board) {
  let bestMoveScore = 100;
  let move = null;
  // test all possible moves if game not over
  if (winner(board, "X") || winner(board, "O") || tie(board)) {
    return null;
  }
  for (let i = 0; i < board.length; i++) {
    let newBoard = validMove(i, minPlayer, board);
    if (newBoard) {
      let moveScore = maxScore(newBoard);
      if (moveScore < bestMoveScore) {
        bestMoveScore = moveScore;
        move = i;
      }
    }
  }
  return move;
}

// min max algorithm
// minimzing player
function minScore(board) {
  if (winner(board, "X")) {
    return 10;
  } else if (winner(board, "O")) {
    return -10;
  } else if (tie(board)) {
    return 0;
  } else {
    let bestMoveValue = 100;
    for (let i = 0; i < board.length; i++) {
      let newBoard = validMove(i, minPlayer, board);
      if (newBoard) {
        let predictedMoveValue = maxScore(newBoard);
        if (predictedMoveValue < bestMoveValue) {
          bestMoveValue = predictedMoveValue;
        }
      }
    }
    return bestMoveValue;
  }
}

// maximizing player
function maxScore(board) {
  if (winner(board, "X")) {
    return 10;
  } else if (winner(board, "O")) {
    return -10;
  } else if (tie(board)) {
    return 0;
  } else {
    let bestMoveValue = -100;
    for (let i = 0; i < board.length; i++) {
      let newBoard = validMove(i, maxPlayer, board);
      if (newBoard) {
        let predictedMoveValue = minScore(newBoard);
        if (predictedMoveValue > bestMoveValue) {
          bestMoveValue = predictedMoveValue;
        }
      }
    }
    return bestMoveValue;
  }
}

// Reset
function reset() {
  for (let i = 0; i < gameBoard.length; i++) {
    gameBoard[i] = " ";
    let cell = document.getElementById(i.toString());
    cell.innerText = " ";
    cell.style.backgroundColor = "inherit";
  }
  msg.innerText = "AI Powered by Min Max";
  maxPlayer = "X";
  minPlayer = "O";
  win = null;
}
