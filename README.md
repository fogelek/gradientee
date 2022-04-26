# Gradientee

Gradientee is a tiny, self-contained library to create randomized gradient backgrounds based on triangles, squares or quadrilaterals.
It is using [Jake Archibald's seeded random function](https://jakearchibald.com/2020/css-paint-predictably-random/) to get predictable results and avoid significant pattern changes on rerenders, for example during box resize

<img width="999" alt="Gradientee example" src="https://user-images.githubusercontent.com/7346433/165068188-bcc2a1d8-c46b-474f-b809-ac1c9cd394b4.png">

## How to use

You can install package from npm: 

```bash npm install gradientee``` 

or use CDN:

```<script src="https://unpkg.com/gradientee@latest/dist/gradientee.min.js"></script>```

### Canvas painter
Include script
```html
<script type="text/javascript" src="https://unpkg.com/gradientee/dist/gradientee.min.js"></script>
```

and then use
```html
<canvas id="canvas"></canvas>
```
```javascript
const node = document.getElementById("canvas");
const ctx = node.getContext("2d");
const options = {
    width: node.width,
    height: node.height,
    colorFrom: "#f00",
    colorTo: "#ff0",
};
paintTriangles(ctx, options);
````
### CSS Paint Api
(experimental)\
Due to experimental nature of Paint API that solution will work only for chrome-based browsers.\
[Please consult ***Can I Use*** for current browser state](https://caniuse.com/css-paint-api)\
Be advised to implement workarounds for other major browsers

To use CSS Houdini paint worklet, add module import into ```<script>``` tags in header of your page

```html
<script type="text/javascript">
    CSS.paintWorklet.addModule("https://unpkg.com/gradientee/dist/gradientee-worklet.min.js");
</script>
```

and then use the css paint:
```css
.selector-to-paint {
    width: 1000px;
    height: 400px;
    background-image: paint(gradientee);
    --gradientee-color-from: #00ff00;
    --gradientee-color-to: #0000ff;
    --gradientee-box-size: 60;
    --gradientee-seed: 1234;
    --gradientee-deflection-level: 20;
    --gradientee-color-randomness: 0;
}
```

### Options
#### Javascript
To control the canvas generator, use **options** js object
```javascript
{
    boxSize: 20,
    colorFrom: "#fff",
    colorTo: "#000",
    colorRandomness: 0,
    deflectionLevel: 20,
    triangles: true,
    seed: 1234
}
```

#### CSS Paint API

For CSS, all options have respective custom properties, formed by applying `--gradientee`
 prefix to a kebab-case formatted option name

```css
.selector-to-paint {
    --gradientee-box-size: 20;
    --gradientee-color-from: #fff;
    --gradientee-color-to: #000;
    --gradientee-color-randomness: 0;
    --gradientee-deflection-level: 20;
    --gradientee-triangles: 1;
    --gradientee-seed: 1234;
}
```

#### List of all the options:
- boxSize - cell size of grid, defaults to **20**
- colorFrom - starting color of gradient, defaults to **#fff**
- colorTo - ending color of gradient, defaults to **#000**
- colorRandomness - randomness of single cell color selection, defaults to **0**
- deflectionLevel - how far should nodes be deflected from original coordinates, in %. Max is **25**, defaults to **20**  
- triangles - selector triangles/quadrilaterals. **0** for quads, **1** for triangles. Defaults to **1**
- seed - numerical value of seed, used for randomizing. Using constant seed will result in getting repetitive random results. Defaults to `Math.rand()`

## How to build

To build, simply run:
```
> npm install
> npm run build
```
