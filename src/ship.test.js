import Ship from "./ship";

const ship = Ship(4);
test("length of ship", () => {
  ship.hit();
  expect(ship.getLength()).toBe(3);
});

test("if ship is sunk", () => {
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("hit already sunken ship", () => {
  expect(ship.hit()).toBeNull();
  expect(ship.isSunk()).toBe(true);
});
