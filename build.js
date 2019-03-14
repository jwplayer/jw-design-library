const yaml = require('js-yaml');
const fs = require('fs');
const glob = require('glob');
const config = yaml.safeLoad(fs.readFileSync('./config.yaml'));
const deepExtend = require('style-dictionary/lib/utils/deepExtend');
const svgSpriteFormatter = require('./scripts/formatters/svg-sprite');
const javascriptEs6ArraysFormatter = require('./scripts/formatters/javascript-es6-arrays');
const lessVariablesListsFormatter = require('./scripts/formatters/less-lists');

// Need to combine properties files
// Replicating functionality in lib/utils/combineJSON.js
var properties = {};
var files = [];

// If there are includes, add them to the properties object first,
// then delete include from the config. This is replicating
// functionality in lib/extend.js
if (config.include && _.isArray(options.include)) {
  config.include.forEach(function(file) {
    deepExtend([properties, yaml.safeLoad(fs.readFileSync(file))]);
  });
  config.include = null;
}

// Create a flat array of files based on glob
config.source.forEach(function(src) {
  files = files.concat(glob.sync(src, {}));
});

// Merge all the properties files together
files.forEach(function(file) {
  deepExtend([properties, yaml.safeLoad(fs.readFileSync(file))]);
});

// Add the newly created properties object to the config
config.properties = properties;
// Remove the source of the config so that the style dictionary
// doesn't try to combine those files because they aren't JSON
config.source = null;

// Now we can extend style dictionary like normal
const styleDictionary = require('style-dictionary').extend(config);

styleDictionary.registerFormat({
	name: 'svg/sprite',
	formatter: svgSpriteFormatter
});

styleDictionary.registerFormat({
	name: 'javascript/es6/arrays',
	formatter: javascriptEs6ArraysFormatter
});


styleDictionary.registerFormat({
	name: 'less/variables/lists',
	formatter: lessVariablesListsFormatter
});

styleDictionary.buildAllPlatforms();
