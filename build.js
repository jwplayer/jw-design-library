/* eslint-disable no-undef */
/* eslint-disable no-var */
const merge = require('merge-deep');
const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;
const svgSpriteFormat = require('./scripts/formatters/svg-sprite');
const fontFace = require('./scripts/formatters/font-face');
const contentArrayToList = require('./scripts/transformers/content-array-to-list');
const attributeFont = require('./scripts/transformers/attribute-font');
const contentListToJsArray = require('./scripts/transformers/content-list-to-js-array');
const jsTransformGroup = require('./scripts/transform-groups/js-transform-group');
const lessTransformGroup = require('./scripts/transform-groups/less-transform-group');
const scssTransformGroup = require('./scripts/transform-groups/scss-transform-group');

require('./scripts/utils/mock-require'); // must load before style-dictionary
const StyleDictionary = require('style-dictionary');
const nameCtiKebab = require("./scripts/transformers/name-cti-kebab");

StyleDictionary.registerTransform(contentArrayToList);
StyleDictionary.registerTransform(attributeFont);
StyleDictionary.registerTransform(contentListToJsArray);
StyleDictionary.registerTransformGroup(lessTransformGroup);
StyleDictionary.registerTransformGroup(scssTransformGroup);
StyleDictionary.registerTransformGroup(jsTransformGroup);
StyleDictionary.registerFormat(svgSpriteFormat);
StyleDictionary.registerFormat(fontFace);
StyleDictionary.registerTransform(nameCtiKebab);


const configDir = path.resolve(__dirname, 'config');
const config = merge(
	{ log: 'warn', source: ['dictionary/properties/**/*.yaml'] },
	...fs.readdirSync(configDir).map(f => require(`${configDir}/${f}`))
);

const styleDictionary = StyleDictionary.extend(config);

if (argv.cssUrlPrefix) {
	styleDictionary.properties.system.config.cssUrlPrefix.value = argv.cssUrlPrefix;
}

if (argv.platform) {
	if (config.platforms[argv.platform]) {
		styleDictionary.buildPlatform(argv.platform);
	} else {
		console.log(`Not really sure how to handle "${argv.platform}". I'm really good at building these though:`);
		Object.keys(config.platforms).sort().forEach(p => console.log(` - ${p}`));
		process.exit(1);
	}
} else {
	styleDictionary.buildAllPlatforms();
}
