# JW Design Library (Hook)

![owners](https://img.shields.io/badge/owners-Design--Team-brightgreen.svg)
![contributors](https://img.shields.io/badge/contributors-Portal--NL-yellow.svg)

> Hook is the single source of truth for global colors, icons & styles used in JW Player products. Built with 
[Amazon Style Dictionary](https://github.com/amzn/style-dictionary/).

* #### [Hook CDN Link](https://hook.jwplayer.com/)
* #### [Hook CDN repo](https://github.com/jwplayer/hook)
* #### [Neverland Visual Docs / Usage](https://design.jwplayer.com/docs/#/)

## Install

Via the [JW Player NPM registry](https://npm-registry.longtailvideo.com/-/web/detail/@design/jw-design-library) **(recommended)**:
```bash
yarn add @design/jw-design-library
```

... or from a specific GitHub tagged version:
```bash
yarn add @design/jw-design-library@github:jwplayer/jw-design-library#<version>
```

## Getting Started
To use Hook's variables, simply import them from the CSS/Less/SCSS directories in `/dist`.

### Colors
Import the color variables and apply them in your stylesheet like this:

```scss
@import (reference) "@design/jw-design-library/dist/scss/brand-colors.scss";
@import (reference) "@design/jw-design-library/dist/scss/data-colors.scss";
@import (reference) "@design/jw-design-library/dist/scss/system-colors.scss";

.my-cool-icon {
    fill: $ds-color-brand-dahlia;
}

.system-status-success {
    color: $ds-color-system-green;
}

.mango-gradient {
    background-image: linear-gradient(to right, $ds-color-ramp-data-scale-mango-7);
}
```

### JavaScript Variables
You can also import colors in JS (`dist/js/`) for use with a libraries like [tinycolor](https://github.com/typectrl/tinycolor) and [D3](https://d3js.org/).

#### Example
```js
import { TinyColor } from '@ctrl/tinycolor';
import { dsColorSystemRed } from 'jw-design-library/dist/js/system-colors.js';

const color = new TinyColor(dsColorSystemRed);
```

### Fonts
We recommend referencing the CDN route in your HTML (so you're not duplicating the font files into your project).

```html
<link href="https://hook.jwplayer.com/jw-design-library/<version>/css/fonts.css" rel="stylesheet" />
```

Then apply the `font-family` variables:

```scss
body {
    font-family: $ds-global-font-family-brand;
}

.code-snippet {
    font-family: $ds-global-font-family-code;
}
```

**Note:** if you choose to use `dist/css/fonts.css` instead, then you must copy or resolve the paths for the font files (`dist/fonts/`), or things won't work!

### Icons
Icons can be imported directly from Hook, but we **🚨  strongly recommend using [WUI components](https://stg-wui.jwplayer.com/component/icon) for this approach!🚨** 
```js
import download from '@design/jw-design-library/dist/icon/dashboard/download.svg';
```

#### SVG Sprites
If you'd rather reference icons from a simple SVG sprite, include your spritesheet somewhere in the body of your HTML and reference the `symbol` you need by ID (`{ds-icon-{dashboard/player/logo}-{icon_name}`).

```html
<!-- The sprite -->
<svg>
    <use xmlns:xlink="https://hook.jwplayer.com/jw-design-library/5.3.0/sprites/sprites-dashboard.svg"></use>
</svg>

<!-- Your SVG -->
<svg class="my-cool-icon"><use href="#ds-icon-dashboard-play" /></svg>
```


## Contribute to Hook

### Install & Build
To build this project locally, ensure you're using **Node v10** and run:

```bash
yarn install
```

To build the `/dist` folder with your new updates:

```bash
yarn build
```
To remove the `/dist` folder completely:

```bash
yarn clean
```

### Adding/Updating Icons
1. Create a feature branch from `master`
2. Pull the new SVG files into the `dictionary/assets/icons` folder for the appropriate product
2. In `/dictionary/properties/icons`, locate the product `yaml` config, add the name of your new icon in alphabetical order along with its path. Be sure to follow the existing spacing protocol — yamls are fussy about tabs and spaces.
3. Run `yarn build`. If the build succeeds, you should see your new icons in the `/dist` folder.
4. Open a PR against `master`. You **must** note 💥 breaking changes 💥 in your PR so projects that depend on Hook are updated appropriately

Take the same approach when updating colors.

That's it! Reach out to the Design team for Github access or any questions/concerns.


---


### How Hook Works (Under the Hood)
The file `build.js` imports various modules from `scripts/` to build the full style-dictionary config. Here's a really quick rundown:

* `formatters/svg-sprite` runs each matched icon through SVGO, then converts the
  SVG into a `<symbol>`. After all icons in the group are optimized, a wrapper is
  added and the SVG file is output.
* `formatters/font-face` uses the structure found in `font-face.yaml` to
output `@font-face` declarations in CSS. All font files referenced in the
dictionary are copied to `dist/fonts`. If you use `fonts.css` then you must copy
or resolve the paths for the font files, or things won't work!
* `transformers/content-array-to-list`: Converts property values into
  comma-separated lists. This is used to output data colors for Less.
  ```yaml
  prop:
    value:
    - '#000000'
    - '#CCCCCC'
    - '#FFFFFF'
  ```
  The example above has this final output:
  ```less
  @prop: #000000, #cccccc, #ffffff;
  ```
* `transformers/content-list-to-js-array`: Converts property values into
  bracketed arrays. This, combined with `content-array-to-list`, is used to
  output data colors for JS. The example above has this final output:
  ```js
  export const prop = ["#000000","#cccccc","#ffffff"];
  ```
* `transform-groups/less-transform-group`: Overrides the built-in `less`
  transformGroup, to add `content/arrayList` and switch to `color/css` for rgba
  output.
* `transform-groups/js-transform-group`: Overrides the built-in `js`
  transformGroup, to add `content/arrayToList` and `content/listToJsArray`.
* `utils/mock-require`: Rather than rewrite the `combineJSON` function present
  in `style-dictionary`, we intercept the `require` call itself to render YAML
  with `js-yaml` when necessary. This may change if `combineJSON` ever changes.
* `utils/svgo`: Since SVGO is asynchronous by design, we use a wrapper module
  with [sync-rpc](https://www.npmjs.com/package/sync-rpc) to treat it as if it's
  synchronous. You may notice the dots when `icons` are being built - each dot
  represents a sprite that has been "synchronously" optimized by SVGO.


