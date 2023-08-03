export const Player = () => {
  const isHuman = () => true;

  return {
    isHuman,
  };
};

export const ComputerPlayer = () => {
  const isHuman = () => false;

  const inRange = (a, b) => a >= 0 && a < 10 && b >= 0 && b < 10;

  const isMoveSmartish = (x, y, board) => { 
    // checking for available moves around a hit
    const toCheck = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (let i = 0; i < toCheck.length; i += 1) {
      const [addX, addY] = toCheck[i];
      if (inRange(x + addX, y + addY) && board[y + addY][x + addX] === "hit") {
        return true;
      }
    }
    return false;
  }

  const makeMove = (board) => {
    // a random move for now, of form x, y
    const validAttack = (a, b) =>
      board[b][a] !== "hit" && board[b][a] !== "miss";

    const moves = [];

    // get all the remaining valid moves
    for (let i = 0; i < 10; i += 1) { 
      for (let j = 0; j < 10; j += 1) {
        if (validAttack(j, i)) {
          if (isMoveSmartish(j, i, board)) return [j, i]; 
          moves.push([j, i]);
        }
      }
    }
    // pick a random one if no smartish one exists
    return moves[Math.floor(Math.random() * moves.length)];
  };
  
  return {
    isHuman,
    makeMove,
  };
};
