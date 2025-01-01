import "./style.css";
import Player from "./player";

const display = (function ScreenController() {
  const board1Container = document.getElementById("board-1-container");
  const board2Container = document.getElementById("board-2-container");
  const currentPlayerDisplay = document.getElementById("current-player");

  const player1 = Player("real");
  const player2 = Player("computer");

  let currentPlayer = player1;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    currentPlayerDisplay.innerHTML = `${currentPlayer.getType()}'s turn`;
    console.log(currentPlayer.getType());
  };

  const newGame = () => {
    // Place ships for player1
    const gameboard1 = player1.getBoard();
    const player1Ships = player1.getShips();
    gameboard1.placeShip(player1Ships[0], [0, 0], "horizontal");
    gameboard1.placeShip(player1Ships[1], [6, 9], "vertical");
    gameboard1.placeShip(player1Ships[2], [2, 2], "horizontal");
    gameboard1.placeShip(player1Ships[3], [6, 3], "vertical");
    gameboard1.placeShip(player1Ships[4], [4, 7], "vertical");

    // Place ships for player2
    const gameboard2 = player2.getBoard();
    const player2Ships = player2.getShips();
    gameboard2.placeShip(player2Ships[0], [4, 3], "vertical");
    gameboard2.placeShip(player2Ships[1], [5, 5], "vertical");
    gameboard2.placeShip(player2Ships[2], [0, 7], "horizontal");
    gameboard2.placeShip(player2Ships[3], [9, 7], "horizontal");
    gameboard2.placeShip(player2Ships[4], [0, 0], "horizontal");

    // test: attack squares
    player1.attack(player2, 0, 0);
    player2.attack(player1);
  };

  function render() {
    board1Container.innerHTML = "";
    board2Container.innerHTML = "";

    const board1Name = document.createElement("div");
    board1Name.textContent = `Player's board`;
    board1Name.classList.add("board-name");
    board1Container.appendChild(board1Name);
    const board2Name = document.createElement("div");
    board2Name.textContent = `Computer's board`;
    board2Name.classList.add("board-name");
    board2Container.appendChild(board2Name);

    const board1 = player1.getBoard().getBoard();
    const board2 = player2.getBoard().getBoard();

    board1Container.appendChild(renderBoard(board1));
    board2Container.appendChild(renderBoard(board2));
  }

  function renderBoard(board) {
    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const square = document.createElement("div");
        square.classList.add("square");

        if (board[row][col].shipId) {
          square.classList.add("ship");
        }
        if (board[row][col].isHit) {
          square.classList.add("hit");
        }
        if (board[row][col].missed) {
          square.classList.add("missed");
        }
        square.dataset.row = row;
        square.dataset.col = col;
        square.addEventListener("click", (e) => {
          const clickedRow = e.target.dataset.row;
          const clickedCol = e.target.dataset.col;
          const opp = currentPlayer === player1 ? player2 : player1;
          console.log(
            `${currentPlayer.getType()} attacked: Row ${clickedRow} Col ${clickedCol}`
          );
          if (currentPlayer.attack(opp, clickedRow, clickedCol)) {
            if (opp.getBoard().allShipsSunk()) {
              // Gameover message
              endgame();
            } else {
              switchPlayer();
              render();
            }
          }
        });
        boardDiv.appendChild(square);
      }
    }
    return boardDiv;
  }

  function endgame() {
    alert(`${currentPlayer.getType()} has won!`);
  }

  newGame();
  render();
})();
