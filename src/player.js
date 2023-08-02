export const Player = () => {
  const isHuman = () => true;

  return {
    isHuman,
  };
};

export const ComputerPlayer = () => {
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
    isHuman,
    makeMove,
  };
};
