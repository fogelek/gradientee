const _allowedLengths = [3, 4, 6, 8];

const _color = (value) => {
  const hex = value.toString(16);
  return hex.length === 2 ? hex : "0" + hex;
};

const _getStop = (a, b, stop, interval) => {
  if (a === b) return a;
  const result = stop * interval;
  if (a > b) return a - result > b ? a - result : b;
  return a + result < b ? a + result : b;
};

const _getColor = (from, to, i, stops) => {
  return {
    r: _getStop(from.r, to.r, i, stops.r),
    g: _getStop(from.g, to.g, i, stops.g),
    b: _getStop(from.b, to.b, i, stops.b),
  };
};

const toHex = (color) => {
  const { r, g, b, a } = color;
  const alpha = a !== undefined && a < 255 ? _color(a) : "";
  return "#" + _color(r) + _color(g) + _color(b) + alpha;
};

const toRgb = (hex) => {
  const val = hex.toString().trim().substring(1);
  if (_allowedLengths.indexOf(val.length) === -1) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const regex = val.length <= 4 ? /[0-9a-fA-F]/g : /[0-9a-fA-F]{1,2}/g;

  const aRgbHex = val.match(regex);
  if (aRgbHex.length > 4 || aRgbHex.length < 3) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const repeats = val.length <= 4 ? 2 : 1;

  return {
    r: parseInt(aRgbHex[0].repeat(repeats), 16),
    g: parseInt(aRgbHex[1].repeat(repeats), 16),
    b: parseInt(aRgbHex[2].repeat(repeats), 16),
    a: aRgbHex.length === 4 ? parseInt(aRgbHex[3].repeat(repeats), 16) : 255,
  };
};

const generateGradient = (colorFrom, colorTo, stops) => {
  const stopValues = {
    r: Math.floor(Math.abs(colorFrom.r - colorTo.r) / stops),
    g: Math.floor(Math.abs(colorFrom.g - colorTo.g) / stops),
    b: Math.floor(Math.abs(colorFrom.b - colorTo.b) / stops),
  };

  const colors = [];
  colors.push(toHex(colorFrom));
  for (let i = 0; i < stops; i++) {
    const color = _getColor(colorFrom, colorTo, i + 1, stopValues);
    const hexColor = toHex(color);
    colors.push(hexColor);
  }
  colors.push(toHex(colorTo));

  return colors;
};

const color = {
  toHex,
  toRgb,
  generateGradient,
};

export default color;
