import Gameboard from "./gameboard";
import { Player, ComputerPlayer } from "./player";
import randomShipsPlacement from "./random_ship_placement";

const SetupController = () => {
  const player1 = Player();
  const player2 = ComputerPlayer();

  const player1Board = Gameboard([5, 4, 3, 3, 2]);
  const player2Board = Gameboard([5, 4, 3, 3, 2]);

  randomShipsPlacement(player2Board);

  return {
    player1,
    player2,
    player1Board,
    player2Board,
  };
};

export default SetupController;
