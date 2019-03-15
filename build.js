/* eslint-disable no-undef */
/* eslint-disable no-var */
require('./scripts/utils/mock-require');

const lessList = require('./scripts/formatters/less-lists');
const javascriptEs6Arrays = require('./scripts/formatters/javascript-es6-arrays');
const svgSprite = require('./scripts/formatters/svg-sprite');
const styleDictionary = require('style-dictionary').extend('./config.yaml');

styleDictionary.registerFormat(lessList);
styleDictionary.registerFormat(javascriptEs6Arrays);
styleDictionary.registerFormat(svgSprite);

styleDictionary.buildAllPlatforms();
