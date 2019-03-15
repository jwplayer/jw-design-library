const styleDictionary = require('style-dictionary').extend('./scripts/yaml-config');

styleDictionary.registerFormat(require('./scripts/formatters/less-lists'));
styleDictionary.registerFormat(require('./scripts/formatters/javascript-es6-arrays'));
styleDictionary.registerFormat(require('./scripts/formatters/svg-sprite'));

styleDictionary.buildAllPlatforms();
