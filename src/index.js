import ScreenController from "./screen_controller";
import "./style.css";

const newGameBtn = document.getElementById("new-game");
const playerForm = document.getElementById("new-player");

newGameBtn.addEventListener("click", () => {
  playerForm.classList.remove("hidden");

  const newPlayerSubmit = playerForm.querySelector('input[type="submit"]');
  newPlayerSubmit.addEventListener("click", () => {
    // add validation...

    console.log("new game started");
    playerForm.classList.add("hidden");
    // need to start the game... calls ScreenController
    ScreenController(playerForm.getElementById("name").value);
  });
});
