import boardComponent from "./board_component";
import GameScreenController from "./game_screen_controller";
import randomShipsPlacement from "./random_ship_placement";
import shipsComponent from "./ships_component";

function addDropListener(elem, player1, player2, player1Board, player2Board) {
  function drop(e) {
    e.preventDefault();

    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);

    // the data is the id of the ship representation that was dragged
    const data = e.dataTransfer.getData("text");
    const shipIndex = parseInt(data.slice(-1), 10);

    const placed = player1Board.placeShip(
      player1Board.getShips()[shipIndex],
      x,
      y,
      !player1Board.getShips()[shipIndex].isHorizontal()
    );

    if (placed && player1Board.unPlacedShips()) {
      // eslint-disable-next-line no-use-before-define
      SetUpScreenController(player1, player2, player1Board, player2Board);
    } else if (placed) {
      // no unplaced ships
      GameScreenController(player1, player2, player1Board, player2Board);
    }
  }

  function allowDrop(e) {
    e.preventDefault();
  }
  elem.addEventListener("dragover", allowDrop);
  elem.addEventListener("drop", drop);
}

const SetUpScreenController = (
  player1,
  player2,
  player1Board,
  player2Board
) => {
  const setupDiv = document.getElementById("player2board");
  const player1boardDiv = document.getElementById("player1board");

  shipsComponent(setupDiv, player1Board);
  boardComponent(player1boardDiv, player1Board, false);

  const dropTargets = document.querySelectorAll(".drop-target");
  dropTargets.forEach((elem) => {
    addDropListener(elem, player1, player2, player1Board, player2Board);
  });

  const random = document.getElementById("random");
  random.addEventListener("click", () => {
    randomShipsPlacement(player1Board);

    if (!player1Board.unPlacedShips()) {
      GameScreenController(player1, player2, player1Board, player2Board);
    }
  });
};

export default SetUpScreenController;
