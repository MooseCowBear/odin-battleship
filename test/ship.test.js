import Ship from "../src/ship";

test("creates ship with specified length", () => {
  const testShip = Ship(4);
  expect(testShip.getLength()).toBe(4);
});

test("ship is sunk if the number of hits is equal to length", () => {
  const testShip = Ship(1);
  testShip.hit();
  expect(testShip.isSunk()).toBeTruthy();
});

test("ship is sunk if the number of hits is greater than length", () => {
  const testShip = Ship(1);
  testShip.hit();
  testShip.hit();
  expect(testShip.isSunk()).toBeTruthy();
});

test("ship can switch between horizontal and vertical orientation", () => {
  const testShip = Ship(2);
  testShip.flipOrientation();
  expect(testShip.isHorizontal()).toBeFalsy();
  testShip.flipOrientation();
  expect(testShip.isHorizontal()).toBeTruthy();
});

test("ship default position is null", () => {
  const testShip = Ship(1);
  expect(testShip.getPosition()).toBe(null);
});

test("set position updates position as expected", () => {
  const testShip = Ship(1);
  testShip.setPosition(1, 2);
  expect(testShip.getPosition()).toEqual([1, 2]);
});
