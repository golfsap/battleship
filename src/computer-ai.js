import { createShips } from "./ship";
import Gameboard from "./gameboard";

export default function Computer() {
  // computer params: level? (easy, medium, hard)

  const name = "computer";
  const computerBoard = Gameboard();
  const computerShips = createShips();

  let firstHit = null;
  let targetStack = [];
  let attackDirection = null;

  // Random hunt mode + checkerboard strategy
  const huntMode = (opp) => {
    const board = opp.getBoard().getBoard();
    const validCells = [];
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (
          !board[row][col].isHit &&
          !board[row][col].missed &&
          (row + col) % 2 === 0
        ) {
          validCells.push({ x: row, y: col });
        }
      }
    }
    // console.log(validCells);
    if (validCells.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * validCells.length);
    return validCells[randomIndex];
  };

  // Targeted mode when attack hits a ship
  const targetMode = (opp) => {
    while (targetStack.length > 0) {
      const { x, y } = targetStack.pop();
      if (isValidAttack(opp, x, y)) {
        return { x, y };
      }
    }
    return huntMode(opp);
  };

  const isValidAttack = (opp, x, y) => {
    const opponentBoard = opp.getBoard().getBoard();
    return (
      x >= 0 &&
      x < 10 &&
      y >= 0 &&
      y < 10 &&
      !opponentBoard[x][y].isHit &&
      !opponentBoard[x][y].missed
    );
  };

  const attack = (opponent, row = null, col = null) => {
    let x, y;
    // manual computer attacks for testing
    if (row !== null && col !== null) {
      x = row;
      y = col;
    } else {
      ({ x, y } = firstHit ? targetMode(opponent) : huntMode(opponent));
    }
    console.log("Attacking: ", { x, y });

    const attackedResult = opponent.getBoard().receiveAttack(x, y);
    if (attackedResult.shipId) {
      if (attackedResult.shipId.isSunk()) {
        console.log("Ship sunk! Resetting attack strategy.");
        targetStack = [];
        attackDirection = null;
        firstHit = null;
      } else {
        if (!firstHit) {
          firstHit = { x, y };
        } else if (!attackDirection) {
          attackDirection = firstHit.x === x ? "horizontal" : "vertical";
        }

        addDirectionalTargets(x, y);
      }
    } else if (targetStack.length === 0) {
      firstHit = null;
    }
    return attackedResult;
  };

  const addDirectionalTargets = (row, col) => {
    if (attackDirection === "horizontal") {
      targetStack.push({ x: row, y: col - 1 }); // left
      targetStack.push({ x: row, y: col + 1 }); // right
    } else if (attackDirection === "vertical") {
      targetStack.push({ x: row + 1, y: col }); // up
      targetStack.push({ x: row - 1, y: col }); // down
    } else {
      targetStack.push({ x: row, y: col - 1 });
      targetStack.push({ x: row, y: col + 1 });
      targetStack.push({ x: row + 1, y: col });
      targetStack.push({ x: row - 1, y: col });
    }
  };

  const getSunkShips = () => {
    return computerShips.filter((ship) => ship.isSunk());
  };

  const resetShips = () => {
    computerShips.forEach((ship) => ship.reset());
    computerBoard.resetBoard();
  };

  const resetGame = () => {
    resetShips();
    firstHit = null;
    targetStack = [];
    attackDirection = null;
  };

  const placeShipsRandomly = () => {
    const directions = ["horizontal", "vertical"];
    const placements = [];

    computerShips.forEach((ship) => {
      let placed = false;

      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const dir = directions[Math.floor(Math.random() * directions.length)];

        if (computerBoard.canPlaceShip(ship, [row, col], dir)) {
          computerBoard.placeShip(ship, [row, col], dir);
          placed = true;

          placements.push({
            shipName: ship.getName(),
            row,
            col,
            dir,
          });
        }
      }
    });
    return placements;
  };

  return {
    getName: () => name,
    getBoard: () => computerBoard,
    attack,
    getSunkShips,
    resetShips,
    resetGame,
    placeShipsRandomly,
  };
}
