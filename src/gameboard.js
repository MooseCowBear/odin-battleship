import Ship from "./ship";

const Gameboard = (shipLengths) => {
  const DIMENSION = 10;
  const board = Array(DIMENSION)
    .fill(null)
    .map(() => Array(DIMENSION).fill(null));
  // will let players place ships, even computer player

  const generateShips = () => {
    const arr = [];
    shipLengths.forEach((len) => {
      arr.push(Ship(len));
    });
    return arr;
  };

  const ships = generateShips();

  const getBoard = () => board;

  const placeShip = (ship, x, y, vertical = true) => {
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
        }
      } else {
        for (let i = x; i < ship.getLength() + x; i += 1) {
          board[y][i] = ship;
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
    /* want to know if we got a hit, 
      a miss or if the move was invalid.
      hit = 1, miss = 0, invalid = -1
    */
    const validAttack = () => board[x][y] !== "hit" && board[x][y] !== "miss";

    if (!validAttack()) {
      return -1;
    }

    if (board[x][y] === null) {
      board[x][y] = "miss";
      return 0;
    }
    board[x][y] = "hit";
    return 1;
  };

  const allShipsSunk = () => {
    for (let i = 0; i < ships.length; i += 1) {
      if (!ships[i].isSunk()) {
        return false;
      }
    }
    return true;
  };

  return {
    getBoard,
    receiveAttack,
    placeShip,
    allShipsSunk,
  };
};

export default Gameboard;