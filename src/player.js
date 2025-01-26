import { createShips } from "./ship";
import Gameboard from "./gameboard";

export default function Player(name) {
  const playerName = name;
  const playerBoard = Gameboard();
  const playerShips = createShips();

  let availableSquares = Array.from({ length: 10 }, (_, row) =>
    Array.from({ length: 10 }, (_, col) => [row, col])
  ).flat();

  const resetAvailableSquares = () => {
    availableSquares = Array.from({ length: 10 }, (_, row) =>
      Array.from({ length: 10 }, (_, col) => [row, col])
    ).flat();
  };

  const attack = (opponent, row, col) => {
    if (playerName === "computer") {
      [row, col] = generateRandomSquare();
    }
    return opponent.getBoard().receiveAttack(row, col);
  };

  const generateRandomSquare = () => {
    // Choose a random attack coordinate which hasn't been attacked yet
    if (availableSquares.length === 0) resetAvailableSquares();
    const randomIndex = Math.floor(Math.random() * availableSquares.length);
    const [row, col] = availableSquares[randomIndex];
    availableSquares.splice(randomIndex, 1);
    return [row, col];
  };

  const getSunkShips = () => {
    return playerShips.filter((ship) => ship.isSunk());
  };

  const resetShips = () => {
    playerShips.forEach((ship) => ship.reset());
    playerBoard.resetBoard();
  };

  const resetGame = () => {
    resetShips();
    resetAvailableSquares();
  };

  const allShipsPlaced = () => {
    return playerShips.every((ship) =>
      playerBoard
        .getBoard()
        .flat()
        .some((cell) => cell.shipId === ship)
    );
  };

  const placeShipsRandomly = () => {
    const directions = ["horizontal", "vertical"];
    const placements = [];

    playerShips.forEach((ship) => {
      let placed = false;

      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const dir = directions[Math.floor(Math.random() * directions.length)];

        if (playerBoard.canPlaceShip(ship, [row, col], dir)) {
          playerBoard.placeShip(ship, [row, col], dir);
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
    getName: () => playerName,
    getBoard: () => playerBoard,
    getShips: () => playerShips,
    attack,
    getSunkShips,
    resetShips,
    resetGame,
    allShipsPlaced,
    placeShipsRandomly,
  };
}
