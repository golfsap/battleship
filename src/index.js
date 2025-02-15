import "./style.css";
import Player from "./player";
import Computer from "./computer-ai";

const display = (function ScreenController() {
  const board1Container = document.getElementById("board-1-container");
  const board2Container = document.getElementById("board-2-container");
  const currentPlayerDisplay = document.getElementById("current-player");
  const sunkShipsContainer = document.getElementById("sunken-ships-container");

  let gameStarted = false;
  const player1 = Player("player");
  const player2 = Computer();
  // const player2 = Player("computer");

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
    document.getElementById("place-ships-modal").style.display = "block";
    document.getElementById("reset-game-btn").addEventListener("click", () => {
      gameStarted = false;
      restartGame();
    });
    document
      .getElementById("place-random-btn")
      .addEventListener("click", createPlaceShipsRandomHandler(player1));
    document
      .getElementById("start-game-btn")
      .addEventListener("click", startGame);

    // Place ships for player1
    const player1Ships = player1.getShips();
    setupShipPlacementValidation(player1Ships);

    // Place ships for player2
    player2.placeShipsRandomly();

    render();
  };

  function startGame() {
    // Check if all ships are placed
    if (!player1.allShipsPlaced()) {
      alert(
        "Please place all ships in valid positions before starting the game."
      );
      return;
    }
    gameStarted = true;
    document.getElementById("place-ships-modal").style.display = "none";
    console.log("Game started!");
    render();
  }

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
        if (isComputerBoard && gameStarted) {
          // enable hover styling
          square.classList.add("active");
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
    gameStarted = false;
    const boards = document.querySelectorAll(".board");
    boards.forEach((board) => board.classList.add("disabled"));
    showEndgameModal(currentPlayer.getName());
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

    cleanUpEventListeners();
    resetInputForm();

    newGame();
  }

  function handlePlaceShips(shipId) {
    const rowInput = document.getElementById(`${shipId}-row`);
    const colInput = document.getElementById(`${shipId}-col`);
    const dirInput = document.getElementById(`${shipId}-direction`);
    const label = document.querySelector(`label[for="${shipId}-row"]`);

    const row = parseInt(rowInput.value, 10);
    const col = parseInt(colInput.value, 10);
    const dir = dirInput.value;

    // validate input
    if (isNaN(row) || isNaN(col)) {
      label.classList.add("error");
      label.classList.remove("success");
      return;
    }

    const gameboard1 = player1.getBoard();
    const player1Ships = player1.getShips();

    const shipIndex = player1Ships.findIndex(
      (ship) => ship.getName() === shipId
    );
    if (shipIndex === -1) return;

    // Remove the ship before re-validating
    gameboard1.removeShip(player1Ships[shipIndex]);

    // validate placement
    const isValid = gameboard1.canPlaceShip(
      player1Ships[shipIndex],
      [row, col],
      dir
    );

    console.log(player1Ships[shipIndex].getName(), "is valid:", isValid);
    // apply class based on validity
    if (isValid) {
      label.classList.add("success");
      label.classList.remove("error");
      // temporarily place the ships
      gameboard1.placeShip(player1Ships[shipIndex], [row, col], dir);
    } else {
      label.classList.add("error");
      label.classList.remove("success");
    }
    render();
  }

  // Add event listeners for all ship inputs
  function setupShipPlacementValidation(ships) {
    ships.forEach((ship) => {
      const rowInput = document.getElementById(`${ship.getName()}-row`);
      const colInput = document.getElementById(`${ship.getName()}-col`);
      const dirInput = document.getElementById(`${ship.getName()}-direction`);

      const validate = () => handlePlaceShips(ship.getName());

      rowInput.addEventListener("input", validate);
      colInput.addEventListener("input", validate);
      dirInput.addEventListener("change", validate);
    });
  }

  function handlePlaceShipsRandom(player) {
    // clear board before every random placements
    player.resetShips();
    const randomPlacements = player.placeShipsRandomly();

    // update form for user to see
    randomPlacements.forEach(({ shipName, row, col, dir }) => {
      document.getElementById(`${shipName}-row`).value = row;
      document.getElementById(`${shipName}-col`).value = col;
      document.getElementById(`${shipName}-direction`).value = dir;

      // add valid class to all the labels
      const label = document.querySelector(`label[for="${shipName}-row"]`);
      label.classList.remove("error");
      label.classList.add("success");
    });
    render();
  }

  function createPlaceShipsRandomHandler(player) {
    return () => handlePlaceShipsRandom(player);
  }

  function resetInputForm() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });
    const labels = document.querySelectorAll("label");
    labels.forEach((label) => {
      label.classList.remove("success");
      label.classList.remove("error");
    });
  }

  function cleanUpEventListeners() {
    const resetBtn = document.getElementById("reset-game-btn");
    if (resetBtn.listener) {
      resetBtn.removeEventListener("click", resetBtn.listener);
      delete resetBtn.listener;
    }

    const placeRandomBtn = document.getElementById("place-random-btn");
    if (placeRandomBtn.listener) {
      placeRandomBtn.removeEventListener("click", placeRandomBtn.listener);
      delete placeRandomBtn.listener;
    }

    const startGameBtn = document.getElementById("start-game-btn");
    if (startGameBtn.listener) {
      startGameBtn.removeEventListener("click", startGameBtn.listener);
      delete startGameBtn.listener;
    }

    const player1Ships = player1.getShips();
    player1Ships.forEach((ship) => {
      const rowInput = document.getElementById(`${ship.getName()}-row`);
      const colInput = document.getElementById(`${ship.getName()}-col`);
      const dirInput = document.getElementById(`${ship.getName()}-direction`);

      if (rowInput.listener) {
        rowInput.removeEventListener("input", rowInput.listener);
        delete rowInput.listener;
      }
      if (colInput.listener) {
        colInput.removeEventListener("input", colInput.listener);
        delete colInput.listener;
      }
      if (dirInput.listener) {
        dirInput.removeEventListener("change", dirInput.listener);
        delete dirInput.listener;
      }
    });
  }

  newGame();
})();
