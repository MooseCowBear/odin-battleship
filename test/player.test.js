import { Player, ComputerPlayer } from "../src/player";
import Gameboard from "../src/gameboard";

test("player is human", () => {
  const testPlayer = Player();
  expect(testPlayer.isHuman()).toBeTruthy();
});

test("computer player is not human", () => {
  const testComputer = ComputerPlayer();
  expect(testComputer.isHuman()).toBeFalsy();
});

test("computer move x and y are in range of 0 - 9", () => {
  const testBoard = Gameboard([]);
  const testComputer = ComputerPlayer();
  const [x, y] = testComputer.makeMove(testBoard.getBoard());
  expect(x).toBeGreaterThanOrEqual(0);
  expect(x).toBeLessThanOrEqual(9);
  expect(y).toBeGreaterThanOrEqual(0);
  expect(y).toBeLessThanOrEqual(9);
});

test("computer chooses sqaure next to hit when one is available", () => {
  const testComputer = ComputerPlayer();
  const testBoard = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  testBoard[0][0] = "hit";
  expect([[0, 1], [1, 0]]).toContainEqual(testComputer.makeMove(testBoard));
});
