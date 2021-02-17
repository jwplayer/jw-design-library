# JW Design Library (Hook)

![owners](https://img.shields.io/badge/owners-Design--Team-brightgreen.svg)
![contributors](https://img.shields.io/badge/contributors-Portal--NL-yellow.svg)

> Hook is the single source of truth for global colors, icons & styles used in JW Player products. Built with 
[Amazon Style Dictionary](https://github.com/amzn/style-dictionary/).

* #### [Hook CDN Link](https://hook.jwplayer.com/)
* #### [Hook CDN Repo](https://github.com/jwplayer/hook)
* #### [Neverland Site](https://design.jwplayer.com/docs/#/)

## Install

Set your npm config to the [JW Player NPM registry](https://npm-registry.longtailvideo.com/-/web/detail/@design/jw-design-library) and run:
```bash
yarn add @design/jw-design-library
```

## Usage
To use Hook's variables, import them from the CSS/Less/SCSS directories in `/dist`.

### Colors
Import the color variables and apply them in your stylesheet like this:

```scss
@import (reference) "@design/jw-design-library/dist/scss/brand-colors.scss";

p {
    color: $ds-color-brand-midnight;
}
```

### Fonts
To use our fonts, reference the CDN route in your HTML:

```html
<link href="https://hook.jwplayer.com/jw-design-library/5.3.0/css/fonts.css" rel="stylesheet" />
```

Then apply the `font-family` and `font-weight` variables:

```scss
@import '@design/jw-design-library/dist/scss/fonts.scss';

p {
    font-family: $ds-global-font-family-custom;
    font-weight: $ds-global-font-weight-custom-semibold;
}

code, pre {
    font-family: $ds-global-font-family-code;
}
```

### Icons
We **recommend using [WUI components](https://stg-wui.jwplayer.com/component/icon) if you're working with a lot of icons,** but you can also import the SVGs directly:
```js
import download from '@design/jw-design-library/dist/icon/dashboard/download.svg';
```

Or use an SVG sprite:
```html
<!-- The sprite, somewhere in your HTML -->
<svg>
    <use xmlns:xlink="https://hook.jwplayer.com/jw-design-library/{version#}/sprites/sprites-dashboard.svg"></use>
</svg>

<!-- Target the ID of the required icon in your HTML -->
<svg><use href="#ds-icon-dashboard-play" /></svg>
```


## Contribute to Hook
Ensure you're using **Node v10** and run:

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

### Add & Update Features
1. Create a feature branch from `master`
2. Pull in any new SVG files into the `dictionary/assets` folder
3. In `/dictionary/properties`, locate the `yaml` config of choice and add new names/values in accordance with file structure
4. Run `yarn build`. If the build succeeds, you should see your changes in the `/dist` folder.
5. Bump the version # accordingly to align with [semantic versioning](https://semver.org/)
6. Open a PR against `master`


### Publish to NPM
1. Set your local npm config to the [internal registry](https://npm-registry.longtailvideo.com/-/web/detail/@design/jw-design-library)
2. Checkout master and pull in the latest: `git checkout master && git pull`
3. Ensure that your local `/dist` folder and version # are correct
5. If all is well: `npm publish`
6. `@design/jw-design-library` will reflect the new version [here](https://npm-registry.longtailvideo.com/-/web/detail/@design/jw-design-library)
7. Draft a release in this repo & note updates and breaking changes

<hr>

## Under the Hood
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


