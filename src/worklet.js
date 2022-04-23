import paintGradientee, { defaultOptions } from "./tools/gradientee.js";

class Gradientee {
  static get inputProperties() {
    return [
      "--gradientee-box-size",
      "--gradientee-color-from",
      "--gradientee-color-to",
      "--gradientee-color-randomness",
      "--gradientee-deflection-level",
      "--gradientee-triangles",
      "--gradientee-seed",
    ];
  }

  paint(ctx, size, props) {
    const boxSize =
      parseInt(props.get("--gradientee-box-size")) || defaultOptions.boxSize;
    const colorFrom =
      props.get("--gradientee-color-from").toString() ||
      defaultOptions.colorFrom;
    const colorTo =
      props.get("--gradientee-color-to").toString() || defaultOptions.colorTo;
    const seed =
      parseInt(props.get("--gradientee-seed")) || Math.random() * 10000;
    const deflectionLevel = parseInt(
      props.get("--gradientee-deflection-level")
    );
    const colorRandomness = parseInt(
      props.get("--gradientee-color-randomness")
    );
    const triangles = parseInt(props.get("--gradientee-triangles")) !== 0;

    const options = {
      width: size.width,
      height: size.height,
      boxSize,
      colorFrom,
      colorTo,
      colorRandomness: isNaN(colorRandomness)
        ? defaultOptions.colorRandomness
        : colorRandomness,
      deflectionLevel: isNaN(deflectionLevel)
        ? defaultOptions.deflectionLevel
        : deflectionLevel,
      triangles,
      seed,
    };

    paintGradientee(ctx, options);
  }
}

registerPaint("gradientee", Gradientee);
