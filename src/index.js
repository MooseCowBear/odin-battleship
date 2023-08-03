// import ScreenController from "./screen_controller";
import SetupController from "./setup_controller";
import SetUpScreenController from "./setup_screen_controller";
import "./style.css";

(function loadScreen() {
  const newGameBtn = document.getElementById("new-game");

  newGameBtn.addEventListener("click", () => {
    const { player1, player2, player1Board, player2Board } = SetupController();
    SetUpScreenController(player1, player2, player1Board, player2Board);
  });

  const { player1, player2, player1Board, player2Board } = SetupController();
  SetUpScreenController(player1, player2, player1Board, player2Board);
})();
