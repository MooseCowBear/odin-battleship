const Ship = (length) => {
  let hits = 0;
  let position = null;
  let horizontal = true;

  const getLength = () => length;

  const hit = () => {
    hits += 1;
  }

  const isSunk = () => (length - hits) <= 0;

  const getPosition = () => position;

  const setPosition = (x, y) => {
    position = [x, y];
  }

  const isHorizontal = () => horizontal;

  const flipOrientation = () => {
    horizontal = !horizontal;
  }

  return {
    getLength,
    hit,
    isSunk,
    getPosition,
    setPosition,
    isHorizontal,
    flipOrientation
  }
}

export default Ship