import Computer from "./computer-ai";
import Player from "./player";

test("target mode selects valid adjacent cells", () => {
  const computerAi = Computer();
  const player = Player("test-player");
  const playerShips = player.getShips();

  // place ship(3) on player board at [0,0];
  player.getBoard().placeShip(playerShips[2], [0, 0], "horizontal");
  computerAi.attack(player, 0, 0);

  // Attack 3 more times to sink the ship regardless of incorrect first guess
  computerAi.attack(player);
  computerAi.attack(player);
  computerAi.attack(player);
  expect(player.getShips()[2].getHits()).toBe(3);
  expect(player.getShips()[2].isSunk()).toBe(true);
});
