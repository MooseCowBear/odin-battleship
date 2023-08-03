/* eslint-disable no-param-reassign */

import { addElement } from "./view_helpers";
import { shipColors } from "./ship_colors";

export default function boardComponent(parent, inputBoard, clickable = true) {
  // clickable indicates opponent's board
  parent.textContent = "";
  const board = inputBoard.getBoard();

  const colors = shipColors();

  for (let y = 0; y < board.length; y += 1) {
    for (let x = 0; x < board.length; x += 1) {
      const classes = [
        "drop-target",
        "h-6",
        "w-6",
        "sm:h-10",
        "sm:w-10",
        "flex",
        "items-center",
        "justify-center",
        "rounded-sm",
      ];
      let text = " ";
      if (board[y][x] === "miss") {
        text = "M";
      } else if (board[y][x] === "hit") {
        text = "H";
      }

      if (
        !clickable &&
        board[y][x] !== "miss" &&
        board[y][x] !== null &&
        board[y][x] !== "hit"
      ) {
        classes.push(colors[`${board[y][x].getLength()}`]);
      } else if (board[y][x] === "hit") {
        classes.push("bg-gray-800/80");
        classes.push("text-gray-100");
      } else {
        classes.push("bg-zinc-300/90");
      }

      if (!clickable) {
        classes.push("cursor-default");
      }
      addElement("button", parent, classes, text, { "data-x": x, "data-y": y });
    }
  }
}
