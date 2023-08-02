import Ship from "./ship";

const Gameboard = (shipLengths) => {
  const DIMENSION = 10;
  const board = Array(DIMENSION)
    .fill(null)
    .map(() => Array(DIMENSION).fill(null));

  const generateShips = () => {
    const arr = [];
    shipLengths.forEach((len) => {
      arr.push(Ship(len));
    });
    return arr;
  };

  const ships = generateShips();

  const getBoard = () => board;

  const placeShip = (ship, x, y, vertical) => {
    const validHorizontalPlacement = () => {
      for (let i = x; i < ship.getLength() + x; i += 1) {
        if (i >= DIMENSION || board[y][i] !== null) {
          return false;
        }
      }
      return !vertical && true;
    };

    const validVerticalPlacement = () => {
      for (let i = y; i < ship.getLength() + y; i += 1) {
        if (i >= DIMENSION || board[i][x] !== null) {
          return false;
        }
      }
      return vertical && true;
    };

    const place = () => {
      if (vertical) {
        for (let i = y; i < ship.getLength() + y; i += 1) {
          board[i][x] = ship;
          ship.setPosition(x, i);
        }
      } else {
        for (let i = x; i < ship.getLength() + x; i += 1) {
          board[y][i] = ship;
          ship.setPosition(i, y);
        }
      }
    };

    if (!(validHorizontalPlacement() || validVerticalPlacement())) {
      return false;
    }
    place();
    return true;
  };

  const receiveAttack = (x, y) => {
    if (board[y][x] === null) {
      board[y][x] = "miss";
      return false;
    }
    board[y][x].hit();
    board[y][x] = "hit";
    return true;
  };

  const allShipsSunk = () => {
    for (let i = 0; i < ships.length; i += 1) {
      if (!ships[i].isSunk()) {
        return false;
      }
    }
    return true;
  };

  const getShips = () => ships;

  const unPlacedShips = () => ships.some(ship => ship.getPosition() === null)

  return {
    getBoard,
    receiveAttack,
    placeShip,
    allShipsSunk,
    getShips,
    unPlacedShips
  };
};

export default Gameboard;
