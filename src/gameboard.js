export default function Gameboard() {
  // Create a 10x10 game board
  const board = Array.from({ length: 10 }, () => Array(10).fill(0));

  const getBoard = () => board;

  const placeShip = (ship, head, direction = "horizontal") => {
    const shipLength = ship.getLength();

    // Check if ship can be placed on the board
    if (direction === "horizontal") {
      if (head[1] + shipLength > 10) return false;

      for (let i = 0; i < shipLength; i++) {
        board[head[0]][head[1] + i] = 1;
      }
    } else if (direction === "vertical") {
      if (head[0] + shipLength > 10) return false;

      for (let i = 0; i < shipLength; i++) {
        board[head[0] + i][head[1]] = 1;
      }
    }
    return true;
  };

  return {
    getBoard,
    placeShip,
  };
}
