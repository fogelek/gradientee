import grid from "./grid.js";
import color from "./color.js";
import canvas from "./canvas.js";
import { randomGenerator } from "./random.js";

export const defaultOptions = {
  width: 100,
  height: 100,
  boxSize: 20,
  colorFrom: "#fff",
  colorTo: "#000",
  colorRandomness: 0,
  deflectionLevel: 20,
  triangles: true,
  seed: null,
};

const paintGradientee = (ctx, options) => {
  let {
    width,
    height,
    boxSize,
    colorFrom,
    colorTo,
    colorRandomness,
    deflectionLevel,
    seed,
    triangles,
  } = { ...defaultOptions, ...options };

  if (deflectionLevel < 0) {
    deflectionLevel = 0;
  } else if (deflectionLevel > 25) {
    deflectionLevel = 25;
  }

  const rand = randomGenerator(seed ? seed : Math.random() * 10000);
  const gridResult = grid.generate(
    width,
    height,
    boxSize,
    deflectionLevel / 100,
    rand
  );

  const colors = color.generateGradient(
    color.toRgb(colorFrom),
    color.toRgb(colorTo),
    gridResult.columns
  );
  canvas.paint(ctx, gridResult.grid, colors, colorRandomness, triangles, rand);
};

export default paintGradientee;
