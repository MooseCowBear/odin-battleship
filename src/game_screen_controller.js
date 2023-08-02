import boardComponent from "./board_component";
import GameController from "./game_controller";

const GameScreenController = (player1, player2, player1Board, player2Board) => {
  const player1boardDiv = document.getElementById("player1board");
  const player2boardDiv = document.getElementById("player2board");

  const toRemove = ["flex", "flex-col", "gap-4"];
  const toAdd = [
    "grid",
    "grid-cols-10",
    "grid-rows-10",
    "gap-1",
    "grow-0",
    "max-h-fit",
    "max-w-fit",
  ];
  player2boardDiv.classList.remove(...toRemove);
  player2boardDiv.classList.add(...toAdd);

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
    if (e.target.id === "random") return;
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
  updateScreen();
  player2boardDiv.addEventListener("click", clickHandler);
};

export default GameScreenController;
