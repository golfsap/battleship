export default function Gameboard() {
  // Create a 10x10 game board
  let board = Array.from({ length: 10 }, () =>
    Array(10)
      .fill(null)
      .map(() => ({ shipId: null, isHit: false, missed: false }))
  );

  const getBoard = () => board;

  const canPlaceShip = (ship, head, direction) => {
    const shipLength = ship.getLength();

    if (direction === "horizontal") {
      if (head[1] + shipLength > 10) return false;

      for (let i = 0; i < shipLength; i++) {
        if (board[head[0]][head[1] + i].shipId) return false;
      }
    } else if (direction === "vertical") {
      if (head[0] + shipLength > 10) return false;

      for (let i = 0; i < shipLength; i++) {
        if (board[head[0] + i][head[1]].shipId) return false;
      }
    }

    return true;
  };

  const placeShip = (ship, head, direction = "horizontal") => {
    if (!canPlaceShip(ship, head, direction)) return false;

    const shipLength = ship.getLength();

    for (let i = 0; i < shipLength; i++) {
      if (direction === "horizontal") {
        board[head[0]][head[1] + i].shipId = ship;
      } else {
        board[head[0] + i][head[1]].shipId = ship;
      }
    }
    return true;
  };

  const receiveAttack = (row, col) => {
    if (!isValidCoordinate(row, col)) return false;

    const attackedSquare = board[row][col];
    if (attackedSquare.isHit || attackedSquare.missed) return false;

    if (attackedSquare.shipId) {
      attackedSquare.isHit = true;
      attackedSquare.shipId.hit();
    } else {
      attackedSquare.missed = true;
    }
    return true;
  };

  const isValidCoordinate = (row, col) =>
    row >= 0 && row < 10 && col >= 0 && col < 10;

  const allShipsSunk = () => {
    return board
      .flat()
      .filter((square) => square.shipId !== null)
      .every((square) => square.isHit);
  };

  const resetBoard = () => {
    board = Array.from({ length: 10 }, () =>
      Array(10)
        .fill(null)
        .map(() => ({ shipId: null, isHit: false, missed: false }))
    );
  };

  return {
    getBoard,
    placeShip,
    receiveAttack,
    allShipsSunk,
    resetBoard,
  };
}
