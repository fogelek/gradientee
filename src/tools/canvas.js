import { randomGenerator } from "./random.js";

const _point = (point) => [point.x, point.y];

const _getPoly = (points) => "M " + points.reduce((x, y) => `${x} ${y}`);

const _cloneGrid = (grid) => grid.map((row) => row.slice());

const paint = (
  ctx,
  grid,
  colors,
  colorRandomness,
  paintTriangles,
  rand = null,
  pure = true
) => {
  ctx.lineWidth = 1;

  const _rand = rand || randomGenerator(Math.random() * 10000);

  const _grid = pure ? _cloneGrid(grid) : grid;

  for (let row = 0; row < _grid.length; row++) {
    for (let column = 0; column < _grid[row].length; column++) {
      const path = _grid[row][column];
      if (!path.direction) {
        path.direction = _rand.next() > 0.5;
      }
      const quadAnchors = [
        _point(path.topLeft),
        _point(path.topRight),
        _point(path.bottomRight),
        _point(path.bottomLeft),
      ];

      const quadrilateral = new Path2D(_getPoly(quadAnchors));

      const colorDeflection = Math.round(
        _rand.next() * (colorRandomness * 2) - colorRandomness
      );
      let colorIndex = column + colorDeflection;
      if (colorIndex < 0) {
        colorIndex = 0;
      } else if (colorIndex >= colors.length) {
        colorIndex = colors.length - 1;
      }

      ctx.fillStyle = colors[colorIndex];
      ctx.strokeStyle = colors[colorIndex];
      ctx.fill(quadrilateral);
      ctx.stroke(quadrilateral);

      if (paintTriangles) {
        const trianglePath = [
          _point(path.topLeft),
          _point(path.direction ? path.topRight : path.bottomRight),
          _point(path.bottomLeft),
        ];
        const triangle = new Path2D(_getPoly(trianglePath));

        const alpha = _rand.next() > 0.5 ? "#ffffff08" : "#00000008";

        ctx.fillStyle = alpha;
        ctx.strokeStyle = alpha;
        ctx.fill(triangle);
        ctx.stroke(triangle);
      }
    }
  }
  return _grid;
};
const canvas = { paint };
export default canvas;
