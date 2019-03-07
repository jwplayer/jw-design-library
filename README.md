# JW Design Library (Hook)

![owners](https://img.shields.io/badge/owners-Design--Team-brightgreen.svg)
![contributors](https://img.shields.io/badge/contributors-Portal--NL-yellow.svg)

> This repository contains a reference for global styles & icons used in JW Player products. Usage guidelines and code snippets for the following can be found on the [JW Design Site](https://design.jwplayer.com/docs/#/).

## Use Hook in Your Project
### Styles
Hook styles can be included in two ways:

#### Option 1: Pull Less Into Build
Import Hook in its entirety, for example:
```less
@import 'jw-design-library/styles/hook';
@import './less/your_other_styles';
```

Or reference only the files you need:
```less
@import 'jw-design-library/styles/variables/fonts';
@import (reference) 'jw-design-library/styles/mixins/global';
```

#### Option 2: CDN-Hosted, Minified CSS
You can also include minified CSS in the document `<head>`. Please keep in mind that this option is **plain CSS**, which will **only output** the selectors and styles for items in the `components` folder (like icons & logos). This does not come with variables and mixins.

```html
<link rel="stylesheet" type="text/css" href="https://hook.jwplayer.com/core/hook.min.css">
```
View our full list of hosted styles at [hook.jwplayer.com](http://hook.jwplayer.com/).

### Typography
To use Hook fonts, invoke the import mixin by calling `.ds-font-imports()`.  **(We recommend doing this only once in your main stylesheet to avoid extraneous requests.)** View usage guidelines [here](https://design.jwplayer.com/docs/#/patterns/typography).

### Iconography
The `icons` folder contains two SVG sprites, `icons-player` and `icons-dashboard`, that can be referenced and customized with CSS. View usage guidelines [here](https://design.jwplayer.com/docs/#/patterns/iconography).

## Contribute to Hook
Have a feature request? Feel free to open a PR and assign it to [Kim Hart](https://github.com/kimhart) or [Monica Parra](https://github.com/monibons). Follow the guidelines below to contribute:

### Branch Namespacing
- **Feature work in progress:** `wip.DES-100.feature-name`
- **Feature work QA-ed and ready for release:** `release.DES-100.feature-name`
- **Bug fixes / minor updates:** `patch.DES-101.bug-fix-description`

### Running Locally
Install the dependencies with `npm` or `yarn`, then run `grunt` to build the project. Run `grunt dev` to run a watcher for interactive development.

### Adding a New Stylesheet
1. Add your Less stylesheet to the `styles` folder
2. Import it in the `hook.less` master file with the appropriate path

### Adding a New Icon
1. Determine if your new icon belongs to the player or dashboard and add the SVG to the appropriate folder
2. Run `grunt` to generate a new spritesheet

