export const Player = (name) => {
  const getName = () => name;

  const isHuman = () => true;

  return {
    getName,
    isHuman,
  };
};

export const ComputerPlayer = () => {
  const computer = Player("Hal");

  const isHuman = () => false;

  const makeMove = (board) => {
    // a random move for now, of form x, y
    const validAttack = (a, b) =>
      board[b][a] !== "hit" && board[b][a] !== "miss";

    const moves = [];

    // get all the remaining valid moves
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (validAttack(i, j)) {
          moves.push([i, j]);
        }
      }
    }
    // pick a random one
    return moves[Math.floor(Math.random() * moves.length)];
  };
  return {
    ...computer,
    isHuman,
    makeMove,
  };
};
