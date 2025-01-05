export default function Ship(len, name) {
  let length = len;
  let hits = 0;
  let sunk = false;

  const hit = () => {
    if (sunk) {
      console.warn(`${name} ship is already sunk!`);
      return;
    }
    hits++;
    if (hits >= length) {
      sunk = true;
    }
  };

  const isSunk = () => sunk;

  return {
    getName: () => name,
    getLength: () => length,
    getHits: () => hits,
    isSunk,
    hit,
  };
}

export const predefinedShips = [
  { length: 5, name: "Carrier" },
  { length: 4, name: "Battleship" },
  { length: 3, name: "Cruiser" },
  { length: 3, name: "Submarine" },
  { length: 2, name: "Destroyer" },
];

export function createShips() {
  return predefinedShips.map((shipData) =>
    Ship(shipData.length, shipData.name)
  );
}
