const GameController = (player1, player2, player1Board, player2Board) => {
  let currPlayer = player1;
  let currBoard = player2Board;
  let winner = null;

  const updateTurn = () => {
    currPlayer = currPlayer === player1 ? player2 : player1;
    currBoard = currBoard === player1Board ? player2Board : player1Board;
  };

  const getWinner = () => winner;

  const setWinner = () => {
    winner = currPlayer;
  };

  const gameOver = () => {
    if (currBoard.allShipsSunk()) {
      setWinner(currPlayer);
      return true;
    }
    return false;
  };

  const takeTurn = (x, y) => {
    // reports whether the game should continue
    const hit = currBoard.receiveAttack(x, y);
    let over = false;
    if (hit) {
      over = gameOver();
    }
    if (over) {
      return false;
    }
    updateTurn();
    return true;
  };

  const getCurrentPlayer = () => currPlayer;

  return {
    getWinner,
    gameOver,
    takeTurn,
    getCurrentPlayer,
  };
};

export default GameController;
