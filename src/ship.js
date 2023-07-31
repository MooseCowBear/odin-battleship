const Ship = (length) => {
  let hits = 0;

  const getLength = () => length

  const hit = () => {
    hits += 1;
  }

  const isSunk = () => (length - hits) === 0;

  return {
    getLength,
    hit,
    isSunk
  }
}

export default Ship