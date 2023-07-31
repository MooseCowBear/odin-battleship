import Ship from "../src/ship"

test('creates ship with specified length', () => {
  const testShip = Ship(4);
  expect(testShip.getLength()).toBe(4);
});

test('ship is sunk if the number of hits is equal to length', () => {
  const testShip = Ship(1);
  testShip.hit();
  expect(testShip.isSunk()).toBe(true);
})

