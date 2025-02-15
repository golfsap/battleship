import Player from "./player";

test("create real player", () => {
  const player = Player("real");

  expect(player.getName()).toEqual("real");
});

test("real player attacks opponent", () => {
  const player1 = Player("real");
  const player2 = Player("computer");
  player1.attack(player2, 0, 5);
  const board2 = player2.getBoard();

  expect(board2.getBoard()[0][5]).toEqual({
    shipId: null,
    isHit: false,
    missed: true,
  });
});

test("computer attacks opponent", () => {
  const player1 = Player("real");
  const player2 = Player("computer");
  expect(player2.attack(player1)).toBeTruthy();
});
