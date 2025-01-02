export default function Ship(len) {
  const nameMapping = {
    5: "Carrier",
    4: "Battleship",
    3: "Cruiser",
    2: "Destroyer",
  };

  let length = len;
  let hits = 0;
  let sunk = false;

  const name = nameMapping[len];

  const hit = () => {
    if (sunk === true) return null;
    hits++;
    length--;
    if (length === 0) {
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
