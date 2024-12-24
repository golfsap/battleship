import Gameboard from "./gameboard";
import Ship from "./ship";

test("place a ship vertically on the board", () => {
  const board = Gameboard();
  const ship = Ship(4);
  board.placeShip(ship, [0, 0], "vertical");
  expect(board.getBoard()[0][0]).toBe(1);
  expect(board.getBoard()[1][0]).toBe(1);
  expect(board.getBoard()[2][0]).toBe(1);
  expect(board.getBoard()[3][0]).toBe(1);
  expect(board.getBoard()[4][0]).toBe(0);
});

test("place a ship horizontally on the board", () => {
  const gameboard = Gameboard();
  const ship = Ship(4);
  gameboard.placeShip(ship, [0, 0], "horizontal");
  const board = gameboard.getBoard();

  expect(board[0][0]).toBe(1);
  expect(board[0][1]).toBe(1);
  expect(board[0][2]).toBe(1);
  expect(board[0][3]).toBe(1);
});

// test("attack hits ship", () => {
//   const ship = Ship(4);
//   const board = Gameboard();
//   board.placeShip(ship, [0, 0]);
//   board.receiveAttack([1, 0]);
//   expect(ship.getLength()).toEqual(3);
// });
