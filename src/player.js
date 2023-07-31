export const Player = (name) => {
  const getName = () => name;

  const isHuman = () => true;

  return {
    getName,
    isHuman,
  };
};

export const ComputerPlayer = () => {
  const computer = Player('Hal');

  const isHuman = () => false;

  const makeMove = () =>
    // a random move for now, of form x, y
    // the onus of check legitimacy of a move is on gameboard receiveAttack
    [
      Math.floor(Math.random() * (9 - 0 + 1)),
      Math.floor(Math.random() * (9 - 0 + 1)),
    ];
  return {
    ...computer,
    isHuman,
    makeMove,
  };
};
