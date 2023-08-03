const randomShipsPlacement = (board) => {
  board.getShips().forEach((ship) => {
    if (ship.getPosition() === null) {
      let placed = false;
      while (!placed) {
        // grab random x, y and direction. try to place ship
        let x;
        let y;

        const vertical = Math.floor(Math.random() * 2) > 0;
        if (vertical) {
          x = Math.floor(Math.random() * 10);
          y = Math.floor(Math.random() * (10 - ship.getLength() + 1));
        } else {
          x = Math.floor(Math.random() * (10 - ship.getLength() + 1));
          y = Math.floor(Math.random() * 10);
        }

        placed = board.placeShip(ship, x, y, vertical);
      }
    }
  });
};

export default randomShipsPlacement