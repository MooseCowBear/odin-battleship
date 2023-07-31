import Gameboard from "../src/gameboard";
import Ship from "../src/ship";

test("creates 10x10 gameboard", () => {
  const testBoard = Gameboard([]);
  expect(testBoard.getBoard().length).toBe(10);
  expect(testBoard.getBoard()[0].length).toBe(10);
  expect(testBoard.getBoard()[0][0]).toBeNull();
});

test("places ship vertically when there is room", () => {
  const testShip = Ship(2);
  const testBoard = Gameboard([]);
  const res = testBoard.placeShip(testShip, 0, 0);
  expect(testBoard.getBoard()[0][0]).not.toBeNull();
  expect(testBoard.getBoard()[1][0]).not.toBeNull();
  expect(res).toBeTruthy();
});

test("places ship horizontally when there is room", () => {
  const testShip = Ship(2);
  const testBoard = Gameboard([]);
  const res = testBoard.placeShip(testShip, 8, 0, false);
  expect(testBoard.getBoard()[0][8]).not.toBeNull();
  expect(testBoard.getBoard()[0][9]).not.toBeNull();
  expect(res).toBeTruthy();
});

test("does not place ship when ship would overflow board vertically", () => {
  const testShip = Ship(2);
  const testBoard = Gameboard([]);
  const res = testBoard.placeShip(testShip, 0, 9);
  expect(res).toBeFalsy();
  expect(testBoard.getBoard()[9][0]).toBeNull();
});

test("does not place ship when ship would overflow board horizontally", () => {
  const testShip = Ship(2);
  const testBoard = Gameboard([]);
  const res = testBoard.placeShip(testShip, 9, 0, false);
  expect(res).toBeFalsy();
  expect(testBoard.getBoard()[0][9]).toBeNull();
});

test("does not place ship when another ship is in the way", () => {
  const shipOne = Ship(8);
  const testShip = Ship(3);
  const testBoard = Gameboard([]);
  testBoard.placeShip(shipOne, 0, 0);
  const res = testBoard.placeShip(testShip, 0, 7);
  expect(res).toBeFalsy();
});

test("reports all ships have been sunk when they are", () => {
  const testBoard = Gameboard([0, 0]);
  expect(testBoard.allShipsSunk()).toBeTruthy();
});

test("reports not all ships have been sunk when they have not", () => {
  const testBoard = Gameboard([0, 1]);
  expect(testBoard.allShipsSunk()).toBeFalsy();
});

test("updates board with a miss if appropriate", () => {
  const testShip = Ship(2);
  const testBoard = Gameboard([]);
  testBoard.placeShip(testShip, 0, 0);
  const res = testBoard.receiveAttack(2, 2);
  expect(res).toBe(0);
  expect(testBoard.getBoard()[2][2]).toEqual("miss");
});

test("updates board with a hit if appropriate", () => {
  const testShip = Ship(2);
  const testBoard = Gameboard([]);
  testBoard.placeShip(testShip, 0, 0);
  const res = testBoard.receiveAttack(0, 0);
  expect(res).toBe(1);
  expect(testBoard.getBoard()[0][0]).toEqual("hit");
});

test("does not update board if selected square has already been marked hit", () => {
  const testShip = Ship(2);
  const testBoard = Gameboard([]);
  testBoard.placeShip(testShip, 0, 0);
  testBoard.receiveAttack(0, 0);
  const res = testBoard.receiveAttack(0, 0);
  expect(res).toBe(-1);
});

test("does not update board if selected square has already been marked a miss", () => {
  const testShip = Ship(2);
  const testBoard = Gameboard([]);
  testBoard.placeShip(testShip, 0, 0);
  testBoard.receiveAttack(2, 2);
  const res = testBoard.receiveAttack(2, 2);
  expect(res).toBe(-1);
});
