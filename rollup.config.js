export default [
  {
    input: "src/lib.js",
    output: {
      file: "dist/gradientee.js",
      format: "cjs",
      sourcemap: true,
      compact: true,
    },
  },
  {
    input: "src/worklet.js",
    output: {
      file: "dist/gradientee-worklet.js",
      format: "cjs",
      compact: true,
      sourcemap: true,
    },
  },
];
