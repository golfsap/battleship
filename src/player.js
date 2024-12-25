import Ship from "./ship";
import Gameboard from "./gameboard";

export default function Player(type) {
  const playerType = type;
  const playerBoard = Gameboard();
  const playerShips = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];

  let availableSquares = [];

  const initializeAvailableSquares = (opponentBoard) => {
    availableSquares = [];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const square = opponentBoard[row][col];
        if (!square.isHit && !square.missed) {
          availableSquares.push([row, col]);
        }
      }
    }
  };

  const attack = (opponent, row, col) => {
    if (playerType === "computer") {
      [row, col] = generateRandomSquare(opponent.getBoard().getBoard());
    }
    return opponent.getBoard().receiveAttack(row, col);
  };

  const generateRandomSquare = (opponentBoard) => {
    // Choose a random attack coordinate which hasn't been attacked yet
    if (availableSquares.length === 0) {
      initializeAvailableSquares(opponentBoard);
    }
    const randomIndex = Math.floor(Math.random() * availableSquares.length);
    const [row, col] = availableSquares[randomIndex];
    availableSquares.splice(randomIndex, 1);
    return [row, col];
  };

  return {
    getType: () => playerType,
    getBoard: () => playerBoard,
    getShips: () => playerShips,
    attack,
  };
}
