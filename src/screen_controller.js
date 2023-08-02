import SetupController from "./setup_controller";
import boardComponent from "./board_component";
import GameController from "./game_controller";

const ScreenController = (playerName) => {
  const player1boardDiv = document.getElementById("player1board");
  const player2boardDiv = document.getElementById("player2board");
  const annoucementDiv = document.getElementById("annoucement");

  const { player1, player2, player1Board, player2Board } =
    SetupController(playerName);

  const game = GameController(player1, player2, player1Board, player2Board);
  let gameOver = false;

  const updateScreen = () => {
    const currPlayer = game.getCurrentPlayer();

    if (gameOver) {
      annoucementDiv.textContent = currPlayer.isHuman() ? "You win!" : "Computer wins!"
    } else {
      annoucementDiv.textContent = currPlayer.isHuman() ? "Your turn." : "Computer's turn.";
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

  // this is what starts the game.. the click handler is what advances it
  player2boardDiv.addEventListener("click", clickHandler);
  updateScreen(); 
};

export default ScreenController;
