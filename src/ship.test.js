import { createShips } from "./ship";

const playerShips = createShips();

test("length of ship", () => {
  expect(playerShips[0].getLength()).toBe(5);
  expect(playerShips[1].getLength()).toBe(4);
  expect(playerShips[2].getLength()).toBe(3);
  expect(playerShips[3].getLength()).toBe(3);
  expect(playerShips[4].getLength()).toBe(2);
});

test("if ship is sunk", () => {
  playerShips[0].hit();
  playerShips[0].hit();
  playerShips[0].hit();
  playerShips[0].hit();
  // playerShips[0].hit();
  expect(playerShips[0].isSunk()).toBe(false);
});

test("hits count of ship", () => {
  playerShips[0].hit();
  expect(playerShips[0].getHits()).toBe(5);
  expect(playerShips[0].isSunk()).toBe(true);
});

test("name of ship", () => {
  expect(playerShips[0].getName()).toBe("carrier");
  expect(playerShips[1].getName()).toBe("battleship");
  expect(playerShips[2].getName()).toBe("cruiser");
  expect(playerShips[3].getName()).toBe("submarine");
  expect(playerShips[4].getName()).toBe("destroyer");
});

test("reset ship", () => {
  expect(playerShips[0].isSunk()).toBe(true);
  playerShips[0].reset();
  expect(playerShips[0].getHits()).toBe(0);
  expect(playerShips[0].isSunk()).toBe(false);
});
