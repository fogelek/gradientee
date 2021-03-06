import { terser } from "rollup-plugin-terser";

const plugins = [
  terser({
    ecma: 2020,
    module: true,
    warnings: true,
  }),
];

export default [
  {
    input: "src/lib.js",
    output: {
      file: "dist/gradientee.js",
      format: "umd",
      sourcemap: true,
      compact: true,
      name: "gradientee",
      exports: "default",
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
  {
    plugins,
    input: "src/lib.js",
    output: {
      file: "dist/gradientee.min.js",
      format: "umd",
      sourcemap: false,
      compact: true,
      name: "gradientee",
      exports: "default",
    },
  },
  {
    plugins,
    input: "src/worklet.js",
    output: {
      file: "dist/gradientee-worklet.min.js",
      format: "cjs",
      compact: true,
      sourcemap: false,
    },
  },
];
