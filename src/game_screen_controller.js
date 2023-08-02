import boardComponent from "./board_component";
import GameController from "./game_controller";

const GameScreenController = (player1, player2, player1Board, player2Board) => {
  const setupDiv = document.getElementById("ships-setup");
  setupDiv.textContent = "";
  
  const player1boardDiv = document.getElementById("player1board");
  const player2boardDiv = document.getElementById("player2board");
  const annoucementDiv = document.getElementById("annoucement");

  const game = GameController(player1, player2, player1Board, player2Board);
  let gameOver = false;

  const updateScreen = () => {
    const currPlayer = game.getCurrentPlayer();

    if (gameOver) {
      annoucementDiv.textContent = currPlayer.isHuman()
        ? "You win!"
        : "Computer wins!";
    } else {
      annoucementDiv.textContent = currPlayer.isHuman()
        ? "Your turn."
        : "Computer's turn.";
    }

    // need to redraw this board... really only need to redraw the last one...
    boardComponent(player1boardDiv, player1Board, false); // human board
    boardComponent(player2boardDiv, player2Board, true); // computer board
  };

  // every time human clicks, computer needs to take a turn
  const clickHandler = (e) => {
    const currPlayer = game.getCurrentPlayer();

    if (e.target.tagName.toLowerCase() === "button" && currPlayer.isHuman()) {
      console.log(e.target.dataset.x, e.target.dataset.y);
      gameOver = !game.takeTurn(
        parseInt(e.target.dataset.x, 10),
        parseInt(e.target.dataset.y, 10)
      );
      updateScreen();

      if (gameOver) return;

      setTimeout(() => {
        const computerMove = player2.makeMove(player1Board.getBoard());
        gameOver = !game.takeTurn(...computerMove);
        updateScreen();
      }, 1000);
    }
  };

  // this is what starts the game.. the click handler is what advances it
  player2boardDiv.addEventListener("click", clickHandler);
  updateScreen();
};

export default GameScreenController;
