/* this is going to control the drawing of the screen and 
  the calling of game and setup controllers
  gets called when the form for player input is submitted? 
*/

import SetupController from "./setup_controller";
import boardComponent from "./board_component";
import GameController from "./game_controller";

const ScreenController = (playerName) => {
  const player1boardDiv = document.getElementById("player1board");
  const player2boardDiv = document.getElementById("player2board");
  const annoucementDiv = document.getElementById("annoucement");

  const { player1, player2, player1Board, player2Board } =
    SetupController(playerName);

  // need to call the view that will allow a human player to place their ships

  //
  console.log(player1Board.getBoard());
  console.log(player2Board.getBoard());

  const game = GameController(player1, player2, player1Board, player2Board);
  let gameOver = false;

  const updateScreen = () => {
    console.log("update screen called...");
    const currPlayer = game.getCurrentPlayer();

    if (gameOver) {
      annoucementDiv.textContent = `${currPlayer.getName()} wins!`; // check this is right
    } else {
      annoucementDiv.textContent = `${currPlayer.getName()}'s turn.`;
    }

    // need to redraw this board... really only need to redraw the last one...
    boardComponent(player1boardDiv, player1Board.getBoard(), false); // human board
    boardComponent(player2boardDiv, player2Board.getBoard(), true); // computer board
  };

  // every time human clicks, computer needs to take a turn
  const clickHandler = (e) => {
    const currPlayer = game.getCurrentPlayer();

    if (e.target.tagName.toLowerCase() === "button" && currPlayer.isHuman()) {
      console.log(e.target.dataset.x, e.target.dataset.y);
      gameOver = !game.takeTurn(parseInt(e.target.dataset.x, 10), parseInt(e.target.dataset.y, 10));
      updateScreen();

      if (gameOver) return;

      setTimeout(() => {
        
        const computerMove = player2.makeMove(player1Board.getBoard());
        gameOver = !game.takeTurn(...computerMove);
        updateScreen();
      }, 1000);
    }
  };

  player2boardDiv.addEventListener("click", clickHandler);
  console.log("should be creating the start screen");
  updateScreen();
};

export default ScreenController;
