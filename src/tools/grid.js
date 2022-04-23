import { randomGenerator } from "./random.js";

const _bounds = (row, column, cellSize) => {
  const move = cellSize / 2;
  return {
    top: row * cellSize - move,
    bottom: (row + 1) * cellSize - move,
    left: column * cellSize - move,
    right: (column + 1) * cellSize - move,
  };
};

const _getDeflection = (column, row, columns, rows, maxDeflect, rand) => {
  if (maxDeflect === 0) {
    return { top: 0, right: 0, bottom: 0 };
  }
  const top =
    column === columns - 1 || row > 0
      ? 0
      : Math.floor(rand.next() * maxDeflect * 2) - maxDeflect;

  const bottom = Math.floor(rand.next() * maxDeflect * 2) - maxDeflect;

  const right = Math.floor(rand.next() * maxDeflect * 2) - maxDeflect;

  return { top, bottom, right };
};

const _cellCoors = (
  row,
  column,
  previousRow,
  previousColumn,
  bounds,
  deflection
) => {
  const leftTop =
    row === 0
      ? {
          x: previousColumn ? previousColumn.topRight.x : bounds.left,
          y: previousColumn ? previousColumn.topRight.y : bounds.top,
        }
      : { x: previousRow.bottomLeft.x, y: previousRow.bottomLeft.y };

  const rightTop =
    row === 0
      ? { x: bounds.right + deflection.top, y: bounds.top }
      : { x: previousRow.bottomRight.x, y: previousRow.bottomRight.y };

  const rightBottom = {
    x: bounds.right + deflection.right,
    y: bounds.bottom + deflection.bottom,
  };

  const leftBottom = {
    x: previousColumn ? previousColumn.bottomRight.x : bounds.left,
    y: previousColumn ? previousColumn.bottomRight.y : bounds.bottom,
  };

  return {
    topLeft: leftTop,
    topRight: rightTop,
    bottomLeft: leftBottom,
    bottomRight: rightBottom,
  };
};

const generate = (width, height, cellSize, deflectionMultiplier, rand) => {
  const grid = [];

  const _rand = rand || randomGenerator(Math.random() * 10000);

  const maxDeflect = Math.floor(cellSize * deflectionMultiplier);

  const columns = Math.ceil(width / cellSize) + 2;
  const rows = Math.ceil(height / cellSize) + 2;

  for (let row = 0; row < rows; row++) {
    grid.push([]);

    for (let column = 0; column < columns; column++) {
      const bounds = _bounds(row, column, cellSize);
      const deflection = _getDeflection(
        column,
        row,
        columns,
        rows,
        maxDeflect,
        _rand
      );

      const previousColumn = column ? grid[row][column - 1] : undefined;
      const previousRow = row ? grid[row - 1][column] : undefined;

      const cellCoords = _cellCoors(
        row,
        column,
        previousRow,
        previousColumn,
        bounds,
        deflection
      );

      grid[row].push(cellCoords);
    }
  }

  return { grid, columns, rows };
};

const grid = {
  generate,
};

export default grid;
