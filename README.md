# JW Design Library (Hook)

This repository contains a reference for global styles & icons used in JW Player products.

## How to Reference Hook
### Styles
Hook styles can be included in two ways:

#### 1. Pull LESS into Build Process
If you're using LESS with Webpack, you'll need to include Hook styles in your build in order to reference variables properly. To do this, import Hook before your other LESS files as follows:
```
@import 'path_to_hook/styles/hook.less';
@import 'path_to_your_other_styles/main.less';
```
**- or -**
#### 2. Include Pre-Minified CSS Stylesheet
You can also include plain CSS the old-fashioned way by referencing all minified styles in `hook.min.css`. Reference the standalone stylesheet in the document `<head>` as follows:
```
<link rel="stylesheet" type="text/css" href="path_to_hook/styles/hook.min.css">
```

### Icons
The icons folder contains two SVG sprites, `icons-player` and `icons-dashboard`, that can be easily referenced and customized with CSS.  

#### Usage
Simply create an svg element with a class of `jw-icon` in your HTML:
```
<svg class="jw-icon">
  <use href="/path_to_hook/icons/sprite_name.svg#icon_name"></use>
</svg>
```

* `path_to_hook`: the relative path to where Hook is included in your project
* `sprite_name`: the name of the sprite (_icons-dashboard_ or _icons-player_)
* `icon_name`: is the icon name, which will display the corresponding icon (all names can be found in the icons folder or in the table in preview-mode)


#### Sizing & Colors
UI icons by default are black and occupy a square artboard on an 8px grid. Add one of the following classes to specify an alternate size:

|    Class    | Size |
| ----------- | ---- |
| jw-icon-xs  | 8px |
| jw-icon-sm  | 16px |
| jw-icon-med | 24px |
| jw-icon-lg  | 32px |

Append the class to the svg itself:
```
<svg class="jw-icon jw-icon-med">
  <use href="/path_to_hook/icons/sprite_name.svg#icon_name"></use>
</svg>
```

You can override an icon's color or size with CSS:
```
.jw-icon {
    fill: #7bb4e5;
    width: 10px;
    height: 10px;
}
```

## Contributing to Hook Source Code

### Branching Guidelines

**Feature work in progress:**

`wip.DES-100.feature-name`

**Feature work QA-ed and ready for release:**

`release.DES-100.feature-name`

**Bug fixes / minor updates:**

`patch.DES-101.bug-fix-description`

### Running Locally
To run this project on your machine:
```
npm install
grunt
```
This will automatically watch and update the CSS + icon sprites as you develop.

#### Adding a New Stylesheet
1. Add your LESS stylesheet to the `styles` folder
2. Import it in the `hook.less` master file as follows: `@import 'path/to/your/file';`

#### Adding a New Icon
1. Determine if your new icon belongs to the player or dashboard and add the SVG to the appropriate folder
2. Grunt will auto-generate a new sprite with all icons
