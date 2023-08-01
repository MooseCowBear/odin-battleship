/* eslint-disable no-param-reassign */

import { addElement } from "./view_helpers";

export default function boardComponent(parent, board, clickable = true) {
  // going to be 100 buttons, arranged in a grid...
  // clickable indicates that it should not show ships too...
  parent.textContent = "";

  for (let y = 0; y < board.length; y += 1) {
    for (let x = 0; x < board.length; x += 1) {
      const classes = [
        "h-10",
        "p-5",
        "flex",
        "items-center",
        "justify-center",
      ];
      let text = " ";
      if (board[y][x] === "miss") {
        text = "M";
      } else if (board[y][x] === "hit") {
        text = "H";
      }

      if (
        (!clickable && board[y][x] !== "miss" && board[y][x] !== null) ||
        (clickable && board[y][x] === "hit")
      ) {
        classes.push("bg-red-400");
        classes.push("text-red-900"); // a color to indicate ships? only on own board
      } else {
        classes.push("bg-zinc-300");
        classes.push("text-zinc-900");
      }

      const btn = addElement("button", parent, classes, text);
      btn.dataset.x = x;
      btn.dataset.y = y;
      if (!clickable) {
        btn.disabled = true;
      }
    }
  }
  console.log(parent);
}