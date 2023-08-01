import Gameboard from "./gameboard";
import { Player, ComputerPlayer } from "./player";

// will move to computer player
const randomShipsPlacement = (board) => {
  console.log(board.getShips());

  board.getShips().forEach((ship) => {
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
  });
};

const SetupController = (playerName) => {
  /* going to take user input from form and create players and 
    boards and then let the setup screen controller get user input for ship placement? 
    if add two player this is going to change
  */
  const player1 = Player(playerName);
  const player2 = ComputerPlayer();

  const player1Board = Gameboard([5, 4, 3, 3, 2]);
  const player2Board = Gameboard([5, 4, 3, 3, 2]);

  randomShipsPlacement(player2Board);
  randomShipsPlacement(player1Board); // will change...

  return {
    player1,
    player2,
    player1Board,
    player2Board,
  };
};

export default SetupController;
