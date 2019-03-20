/* eslint-disable no-undef */
/* eslint-disable no-var */
require('./scripts/utils/mock-require');

const svgSpriteFormat = require('./scripts/formatters/svg-sprite');
const contentArrayToList = require('./scripts/transformers/content-array-to-list');
const contentListToJsArray = require('./scripts/transformers/content-list-to-js-array');
const jsTransformGroup = require('./scripts/transform-groups/js-transform-group');
const lessTransformGroup = require('./scripts/transform-groups/less-transform-group');
const styleDictionary = require('style-dictionary').extend('./config.yaml');

styleDictionary.registerTransform(contentArrayToList);
styleDictionary.registerTransform(contentListToJsArray);

styleDictionary.registerTransformGroup(lessTransformGroup);
styleDictionary.registerTransformGroup(jsTransformGroup);

styleDictionary.registerFormat(svgSpriteFormat);

styleDictionary.buildAllPlatforms();
