// https://jakearchibald.com/2020/css-paint-predictably-random/
export const randomGenerator = (seed) => {
  let state = seed;

  const next = () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  return {
    next,
    // Instead of incrementing, set the seed
    // to a 'random' 32 bit value:
    fork: () => randomGenerator(next() * 2 ** 32),
  };
};
