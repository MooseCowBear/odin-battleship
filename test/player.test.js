import { Player, ComputerPlayer } from "../src/player";

test("getName returns player name", () => {
  const testPlayer = Player("Suzie");
  expect(testPlayer.getName()).toEqual("Suzie");
});

test("player is human", () => {
  const testPlayer = Player("Malek");
  expect(testPlayer.isHuman()).toBeTruthy();
});

test("computer player is not human", () => {
  const testComputer = ComputerPlayer();
  expect(testComputer.isHuman()).toBeFalsy();
});

test("computer move x and y are in range of 0 - 9", () => {
  const testComputer = ComputerPlayer();
  const [x, y] = testComputer.makeMove();
  expect(x).toBeGreaterThanOrEqual(0);
  expect(x).toBeLessThanOrEqual(9);
  expect(y).toBeGreaterThanOrEqual(0);
  expect(y).toBeLessThanOrEqual(9);
});
