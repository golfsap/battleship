export default function Ship(len) {
  let length = len;
  let hits = 0;
  let sunk = false;

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
    getLength: () => length,
    getHits: () => hits,
    isSunk,
    hit,
  };
}
