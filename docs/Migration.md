# Migration Guide

## Migrating from v4.x.x

## System Colors
---
| Original Value | New Value |
| -- | -- |
| `@ds-white` | `@ds-color-system-white` |
| `@ds-black` | `@ds-color-system-black` |
| `@ds-blue` | `@ds-color-system-blue` |
| `@ds-green` | `@ds-color-system-green` |
| `@ds-orange` | `@ds-color-system-orange` |
| `@ds-red` | `@ds-color-system-red` |

## Brand Colors
---
| Original Value | New Value |
| -- | -- |
| `@ds-dahlia` | `@ds-color-brand-dahlia` |
| `@ds-dahlia-fade` | `@ds-color-brand-dahlia-fade` |
| `@ds-dahlia-dark-1` | `@ds-color-brand-dahlia-dark` |
| `@ds-dahlia-dark-2` | `@ds-color-brand-dahlia-darker` |
| `@ds-fog` | `@ds-color-brand-fog` |
| `@ds-fog-fade` | `@ds-color-brand-fog-fade` |
| `@ds-fog-dark-1` | `@ds-color-brand-fog-dark` |
| `@ds-fog-dark-2` | `@ds-color-brand-fog-darker` |
| `@ds-midnight` | `@ds-color-brand-midnight` |
| `@ds-midnight-fade` | `@ds-color-brand-midnight-fade` |
| `@ds-midnight-dark-1` | `@ds-color-brand-midnight-dark` |
| `@ds-midnight-dark-2` | `@ds-color-brand-midnight-darker` |
| `@ds-abyss` | `@ds-color-brand-abyss` |
| `@ds-abyss-fade` | `@ds-color-brand-abyss-fade` |
| `@ds-abyss-dark-1` | `@ds-color-brand-abyss-dark` |
| `@ds-abyss-dark-2` | `@ds-color-brand-abyss-darker` |

## Code Colors
---
| Original Value | New Value |
| -- | -- |
| `@ds-code-green` | `@ds-color-code-green` |
| `@ds-code-purple` | `@ds-color-code-purple` |
| `@ds-code-blue` | `@ds-color-code-blue` |
| `@ds-code-pink` | `@ds-color-code-pink` |
| `@ds-code-orange` | `@ds-color-code-orange` |
| `@ds-code-background` | `@ds-color-code-background` |
| `@ds-code-text` | `@ds-color-code-text` |
| `@ds-inline-code-background` | `@ds-color-code-background-inline` |
| `@ds-inline-code-text` | `@ds-color-code-text-inline` |

## Data Colors
---
> Note: Individual variables for data colors are no longer available.

| Original Value | New Values |
| -- | -- |
| `@ds-palette-a` | `@ds-color-ramp-data-palette-plum-2`<br>`@ds-color-ramp-data-palette-plum-3`<br>`@ds-color-ramp-data-palette-plum-4`<br>`@ds-color-ramp-data-palette-plum-5`<br>`@ds-color-ramp-data-palette-plum-6`
| `@ds-palette-b` | `@ds-color-ramp-data-palette-lime-2`<br>`@ds-color-ramp-data-palette-lime-3`<br>`@ds-color-ramp-data-palette-lime-4`<br>`@ds-color-ramp-data-palette-lime-5`<br>`@ds-color-ramp-data-palette-lime-6`
| `@ds-palette-c` | `@ds-color-ramp-data-palette-apricot-2`<br>`@ds-color-ramp-data-palette-apricot-3`<br>`@ds-color-ramp-data-palette-apricot-4`<br>`@ds-color-ramp-data-palette-apricot-5`<br>`@ds-color-ramp-data-palette-apricot-6`
| `@ds-single-hue-a` | `@ds-color-ramp-data-red-3`<br>`@ds-color-ramp-data-red-4`<br>`@ds-color-ramp-data-red-5`<br>`@ds-color-ramp-data-red-6`
| `@ds-single-hue-b` | `@ds-color-ramp-data-green-3`<br>`@ds-color-ramp-data-green-4`<br>`@ds-color-ramp-data-green-5`<br>`@ds-color-ramp-data-green-6`
| `@ds-single-hue-c` | `@ds-color-ramp-data-blue-3`<br>`@ds-color-ramp-data-blue-4`<br>`@ds-color-ramp-data-blue-5`<br>`@ds-color-ramp-data-blue-6`
| `@ds-color-scale-a` | `@ds-color-ramp-data-scale-mango-5`<br>`@ds-color-ramp-data-scale-mango-7`
| `@ds-color-scale-b` | `@ds-color-ramp-data-scale-raspberry-5`<br>`@ds-color-ramp-data-scale-raspberry-7`
| `@ds-color-scale-c` | `@ds-color-ramp-data-scale-pear-5`<br>`@ds-color-ramp-data-scale-pear-7`

## Fonts
---
| Original Value | New Values |
| -- | -- |
| `@ds-font-system` | `@ds-global-font-family-base` |
| `@ds-font-custom` | `@ds-global-font-family-custom` |
| `@ds-font-code` | `@ds-global-font-family-code` |
| `@ds-font-data` | `@ds-global-font-family-data` |
| `@ds-font-size-base` | `@ds-global-font-size-base` |
| `@ds-font-custom-light` | `@ds-global-font-weight-custom-light` |
| `@ds-font-custom-regular` | `@ds-global-font-weight-custom-regular` |
| `@ds-font-custom-semibold` | `@ds-global-font-weight-custom-semibold` |
| `@ds-font-custom-bold` | `@ds-global-font-weight-custom-bold` |
| `@ds-font-data-regular` | `@ds-global-font-weight-data-regular` |
| `@ds-font-data-bold` | `@ds-global-font-weight-data-bold` |
| `@ds-font-data-black` | `@ds-global-font-weight-data-black` |

## Mixins
---
| Original Mixin | Recommendation |
| -- | -- |
| `.ds-font-imports()` | Use `dist/css/fonts.css` and the files in `dist/fonts/`. |
| `.ds-font-smoothing(on)`<br>`.ds-font-smoothing(off)` | Implement `font-smoothing` as needed in your project. |
| `.ds-square()`<br>`.ds-flex()` | These mixins will be integrated into a common mixins package in `jwplayer/design-library-extensions`.
| `.ds-paletteA-classes()`<br>`.ds-paletteB-classes()`<br>`.ds-paletteC-classes()`<br>`.ds-singleHueA-classes()`<br>`.ds-singleHueB-classes()`<br>`.ds-singleHueC-classes()`<br>`.ds-colorScaleA-classes()`<br>`.ds-colorScaleB-classes()`<br>`.ds-colorScaleC-classes()`<br> | These mixins have been removed and should not be used. Instead, use the Data Colors variables listed above.
