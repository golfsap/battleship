import Ship from "./ship";
import Gameboard from "./gameboard";

export default function Player(type) {
  const playerType = type;
  const playerBoard = Gameboard();
  const playerShips = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];

  let availableSquares = Array.from({ length: 10 }, (_, row) =>
    Array.from({ length: 10 }, (_, col) => [row, col])
  ).flat();

  const resetAvailableSquares = () => {
    availableSquares = Array.from({ length: 10 }, (_, row) =>
      Array.from({ length: 10 }, (_, col) => [row, col])
    ).flat();
  };

  const attack = (opponent, row, col) => {
    if (playerType === "computer") {
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
    const sunkShips = [];
    for (const ship of playerShips) {
      if (ship.isSunk()) {
        sunkShips.push(ship);
      }
    }
    return sunkShips;
  };

  return {
    getType: () => playerType,
    getBoard: () => playerBoard,
    getShips: () => playerShips,
    attack,
    getSunkShips,
  };
}
