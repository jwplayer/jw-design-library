# JW Design Library (Hook)

![owners](https://img.shields.io/badge/owners-Design--Team-brightgreen.svg)
![contributors](https://img.shields.io/badge/contributors-Portal--NL-yellow.svg)

> This repository contains a reference for global styles & icons used in
> JW Player products. Usage guidelines and code snippets for the following can
> be found on the [JW Design Site](https://design.jwplayer.com/docs/#/).

## Use Hook in Your Project

The `dist` directory contains various files you can reference in your project:

* Less variable stylesheets for `@import`ing
* JavaScript/ES6 exports
* SVG `<symbol>` spritesheets for use with `<use>` tags

To use the tagged Github releases:
```bash
# with yarn
yarn add jwplayer/jw-design-library#v5.0.2

# with npm
npm install jwplayer/jw-design-library#v5.0.2
```

### Use with Less
We provide various files that contain namespaced Less variables to use in your
project (`dist/less/`). It's recommended to use these files by reference/import
instead of integrating them directly, to avoid using stale properties.

Currently, this set includes JW Player brand-specific colors, global system
colors, and data visualization value lists for gradients and color stops.

#### Example
In your stylesheet, you can import the color variables like this:
```less

@import (reference) "jw-design-library/dist/less/brand-colors.less";
@import (reference) "jw-design-library/dist/less/data-colors.less";
@import (reference) "jw-design-library/dist/less/system-colors.less";

.my-cool-icon {
    fill: @ds-color-brand-dahlia;
}

.example-gradient {
    background-image: linear-gradient(to right, @ds-color-ramp-data-scale-mango-7);
}
```

#### Notes on using Less variables:
* If you're using `webpack/less-loader`, make sure to read
  [this section](https://github.com/webpack-contrib/less-loader#imports) of the
  README.
* To keep things DRY, you can use
  [variables](http://lesscss.org/features/#variables-feature-import-statements)
  to shorten import paths.

#### Fonts
Font face blocks are provided in a CSS file since there's no Less-specific
content in the output. If you use `dist/css/fonts.css` then you must copy or
resolve the paths for the font files (`dist/fonts/`), or things won't work!

To include this file as a Less file, use it like this:
```less
@import (less) "jw-design-library/dist/css/fonts.css";
```

### Use with JavaScript
Color variables are available as exports (`dist/js/`). Brand and system colors
are individual strings that can be used with a library like
[tinycolor](https://github.com/typectrl/tinycolor).

Data colors are arrays of color values as strings intended for use with data
visualization frameworks like D3.

#### Example
In your module, you can import any of the color variables like this:
```js
import { TinyColor } from '@ctrl/tinycolor';
import { dsColorSystemRed } from 'jw-design-library/dist/js/system-colors.js';

const color = new TinyColor(dsColorSystemRed);
```

### SVG Sprites
SVG sprites are available as raw SVG files, intended to be used with "The 'New'
Way" (https://css-tricks.com/svg-symbol-good-choice-icons/#article-header-id-1)
to render SVG sprite icons. Here's an example:
```html
<style> /* clearly rendered via Less variables from the design library ;) */
  .my-cool-icon { fill: #ec0041 }
  .my-blue-icon { fill: #0a75e3 }
</style>
<!-- The *contents* of the spritesheet need to be included somewhere in the
body, but only once - we're working with IDs here! -->
<svg xmlns="http://www.w3.org/2000/svg" id="ds-sprites-dashboard" style="display:none">
  <symbol viewBox="0 0 24 24" id="ds-icon-dashboard-play"><path d="M20.11 10.34l-12-8A2 2 0 0 0 5 4v16a2 2 0 0 0 3.11 1.66l12-8a2 2 0 0 0 0-3.32z"/></symbol>
  <!-- more <symbols>... -->
</svg>

<!-- icons can be styled independently of each other -->
<svg class="my-cool-icon"><use href="#ds-icon-dashboard-play" /></svg>
<svg class="my-blue-icon"><use href="#ds-icon-dashboard-play" /></svg>
```

## Contributing

### Building
To build this project on your machine:

```bash
# install the dependencies
yarn install

# Remove the `dist` folder completely
yarn clean

# Run the build script
yarn build
```

### Build Script
The file `build.js` imports various modules from `scripts/` to build the full
style-dictionary config. Here's a really quick rundown:

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


### Dictionary
This project is built with Amazon's fantastic
[Style Dictionary](https://github.com/amzn/style-dictionary/) project.
Documentation for the base project can be found
[here](https://amzn.github.io/style-dictionary/).

This repository is first and foremost a collection of key-value pairs.

## Contribute to Hook
Have a feature request? Feel free to open a PR and assign it to
[Kim Hart](https://github.com/kimhart),
[Monica Parra](https://github.com/monibons), or
[John Kreitlow](https://github.com/radium-v). Follow the guidelines below to
contribute:
### Branch Namespacing
- **Feature work in progress:** `wip.DES-100.feature-name`
- **Feature work QA-ed and ready for release:** `release.DES-100.feature-name`
- **Bug fixes / minor updates:** `patch.DES-101.bug-fix-description`
