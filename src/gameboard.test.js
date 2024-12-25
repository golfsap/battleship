import Gameboard from "./gameboard";
import Ship from "./ship";

test("place a ship vertically on the board", () => {
  const board = Gameboard();
  const ship = Ship(4);
  board.placeShip(ship, [0, 0], "vertical");
  expect(board.getBoard()[0][0]).toEqual({
    shipId: ship,
    isHit: false,
    missed: false,
  });
  expect(board.getBoard()[1][0]).toEqual({
    shipId: ship,
    isHit: false,
    missed: false,
  });
  expect(board.getBoard()[2][0]).toEqual({
    shipId: ship,
    isHit: false,
    missed: false,
  });
  expect(board.getBoard()[3][0]).toEqual({
    shipId: ship,
    isHit: false,
    missed: false,
  });
  expect(board.getBoard()[4][0]).toEqual({
    shipId: null,
    isHit: false,
    missed: false,
  });
});

test("place a ship horizontally on the board", () => {
  const gameboard = Gameboard();
  const ship = Ship(4);
  gameboard.placeShip(ship, [0, 0], "horizontal");
  const board = gameboard.getBoard();

  expect(board[0][0]).toEqual({ shipId: ship, isHit: false, missed: false });
  expect(board[0][1]).toEqual({ shipId: ship, isHit: false, missed: false });
  expect(board[0][2]).toEqual({ shipId: ship, isHit: false, missed: false });
  expect(board[0][3]).toEqual({ shipId: ship, isHit: false, missed: false });
});

test("place a ship out of bounds", () => {
  const gameboard = Gameboard();
  const ship = Ship(5);

  expect(gameboard.placeShip(ship, [6, 0], "vertical")).toBeFalsy();
});

test("place overlapping ships", () => {
  const gameboard = Gameboard();
  const ship1 = Ship(3);
  const ship2 = Ship(4);

  expect(gameboard.placeShip(ship1, [5, 5], "vertical")).toBeTruthy();
  expect(gameboard.placeShip(ship2, [2, 5], "vertical")).toBeFalsy();
});

test("attack hits ship", () => {
  const ship = Ship(4);
  const board = Gameboard();
  board.placeShip(ship, [0, 0], "horizontal");

  expect(board.receiveAttack(0, 1)).toBeTruthy();
  expect(ship.getLength()).toEqual(3);
});

test("attack misses ship", () => {
  const ship = Ship(2);
  const board = Gameboard();
  board.placeShip(ship, [2, 3], "horizontal");

  expect(board.receiveAttack(1, 1)).toBeFalsy();
  expect(ship.getLength()).toEqual(2);
  expect(board.getBoard()[1][1]).toEqual({
    shipId: null,
    isHit: false,
    missed: true,
  });
});

test("all ships sunk", () => {
  const ship = Ship(2);
  const board = Gameboard();
  board.placeShip(ship, [2, 3], "horizontal");
  board.receiveAttack(2, 3);
  board.receiveAttack(2, 4);

  expect(ship.isSunk()).toBeTruthy();
  expect(board.allShipsSunk()).toBeTruthy();
});

test("not all ships are sunk", () => {
  const ship1 = Ship(3);
  const ship2 = Ship(2);

  const board = Gameboard();

  board.placeShip(ship1, [0, 0], "horizontal");
  board.placeShip(ship2, [4, 4], "vertical");
  board.receiveAttack(0, 0);
  board.receiveAttack(0, 1);

  expect(ship1.isSunk()).toBeFalsy();
  expect(ship2.isSunk()).toBeFalsy();
  expect(board.allShipsSunk()).toBeFalsy();
});
