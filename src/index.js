import "./style.css";
import Player from "./player";

const display = (function ScreenController() {
  const board1Container = document.getElementById("board-1-container");
  const board2Container = document.getElementById("board-2-container");
  const currentPlayerDisplay = document.getElementById("current-player");
  const sunkShipsContainer = document.getElementById("sunken-ships-container");

  const player1 = Player("player");
  const player2 = Player("computer");

  let currentPlayer = player1;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    currentPlayerDisplay.innerHTML = `${currentPlayer.getName()}'s turn`;

    // Handle if computer's turn
    if (currentPlayer.getName() === "computer") {
      board2Container.classList.add("dimmed");
      setTimeout(() => {
        const opp = currentPlayer === player1 ? player2 : player1;
        if (currentPlayer.attack(opp)) {
          render();
          if (opp.getBoard().allShipsSunk()) {
            endgame();
          } else {
            switchPlayer();
          }
        }
        board2Container.classList.remove("dimmed");
      }, 600);
    }
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

    render();
  };

  function render() {
    board1Container.innerHTML = "";
    board2Container.innerHTML = "";
    sunkShipsContainer.innerHTML = "";

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

    board1Container.appendChild(renderBoard(board1, false));
    board2Container.appendChild(renderBoard(board2, true));

    sunkShipsContainer.appendChild(renderSunkShips(player1));
    sunkShipsContainer.appendChild(renderSunkShips(player2));
  }

  function renderBoard(board, isComputerBoard = false) {
    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const square = document.createElement("div");
        square.classList.add("square");

        // Check if square contains a ship
        if (board[row][col].shipId) {
          const ship = board[row][col].shipId;
          // square.classList.add("ship");

          if (ship.isSunk()) {
            square.innerHTML = '<i class="fa-solid fa-skull"></i>';
            square.classList.add("sunk");
          } else if (board[row][col].isHit) {
            square.innerHTML = '<i class="fa-solid fa-bomb"></i>';
            square.classList.add("hit");
          } else {
            square.classList.add("ship");
          }
        } else if (board[row][col].missed) {
          square.innerHTML = '<i class="fa-solid fa-x"></i>';
          square.classList.add("missed");
        }
        // Add event listener only for computer's board
        if (isComputerBoard) {
          square.dataset.row = row;
          square.dataset.col = col;
          square.addEventListener("click", (e) => playTurn(e));
        }
        boardDiv.appendChild(square);
      }
    }
    return boardDiv;
  }

  function renderSunkShips(player) {
    const sunkShipsDiv = document.createElement("div");
    sunkShipsDiv.classList.add("sunk-ships");

    const sunkenShips = player.getSunkShips();
    if (sunkenShips.length > 0) {
      for (const ship of sunkenShips) {
        sunkShipsDiv.innerHTML += `${player.getName()[0].toUpperCase() + player.getName().slice(1)}'s ${ship.getName()} has been sunk!<br>`;
      }
    }
    return sunkShipsDiv;
  }

  function playTurn(e) {
    const clickedRow = e.currentTarget.dataset.row;
    const clickedCol = e.currentTarget.dataset.col;
    const opp = currentPlayer === player1 ? player2 : player1;
    console.log(
      `${currentPlayer.getName()} attacked: Row ${clickedRow} Col ${clickedCol}`
    );
    if (currentPlayer.attack(opp, clickedRow, clickedCol)) {
      render();
      if (opp.getBoard().allShipsSunk()) {
        endgame();
      } else {
        switchPlayer();
      }
    }
  }

  function endgame() {
    const boards = document.querySelectorAll(".board");
    boards.forEach((board) => board.classList.add("disabled"));
    showEndgameModal(currentPlayer.getName());
    // alert(`${currentPlayer.getName()} has won!`);
  }

  function showEndgameModal(winner) {
    const modal = document.getElementById("endgame-modal");
    const message = document.getElementById("endgame-message");
    message.textContent = `${winner} Wins!`;
    modal.classList.remove("hidden");
    document.getElementById("restart-btn").addEventListener("click", () => {
      modal.classList.add("hidden");
      restartGame();
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modal.classList.add("hidden");
      }
    });
  }

  function restartGame() {
    player1.resetGame();
    player2.resetGame();
    currentPlayer = player1;

    newGame();
  }
  newGame();
  // render();
})();
