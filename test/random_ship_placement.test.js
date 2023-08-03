import Gameboard from "../src/gameboard";
import randomShipsPlacement from "../src/random_ship_placement";

test("all ships are placed", () => {
  const testBoard = Gameboard([1, 2, 3]);
  randomShipsPlacement(testBoard);
  expect(testBoard.unPlacedShips()).toBeFalsy();
});