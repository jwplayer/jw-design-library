const styleDictionary = require('style-dictionary').extend('./config.json');
const path = require('path');
const fs = require('fs');
const SVGO = require('svgo');
const cheerio = require('cheerio');

const svgo = new SVGO({
	plugins: [
		{ cleanupAttrs: true },
		{ removeDoctype: true },
		{ removeXMLProcInst: true },
		{ removeComments: true },
		{ removeMetadata: true },
		{ removeTitle: true },
		{ removeDesc: true },
		{ removeUselessDefs: true },
		{ removeEditorsNSData: true },
		{ removeEmptyAttrs: true },
		{ removeHiddenElems: true },
		{ removeEmptyText: true },
		{ removeEmptyContainers: true },
		{ removeViewBox: false },
		{ cleanupEnableBackground: true },
		{ convertStyleToAttrs: true },
		{ convertColors: true },
		{ convertPathData: true },
		{ convertTransform: true },
		{ removeUnknownsAndDefaults: true },
		{ removeNonInheritableGroupAttrs: true },
		{ removeUselessStrokeAndFill: true },
		{ removeUnusedNS: true },
		{ cleanupIDs: true },
		{ cleanupNumericValues: true },
		{ moveElemsAttrsToGroup: true },
		{ moveGroupAttrsToElems: true },
		{ collapseGroups: true },
		{ removeRasterImages: false },
		{ mergePaths: true },
		{ convertShapeToPath: true },
		{ sortAttrs: true },
		{ removeDimensions: true },
		{ removeAttrs: {attrs: '(stroke|fill)'} }
	]
});

styleDictionary.registerFormat({
	name: 'svg/sprite',
	formatter: (dictionary, config) => {
		return (async () => {
			let items = dictionary.allProperties.map(async ({ name, value }) => {
				const file = fs.readFileSync(path.resolve(value), 'utf8');
				return new Promise((resolve, reject) => {
					return svgo.optimize(file).then(({ data }) => resolve(data));
				});
			});

			// const results = await Promise.all(promises);
			// results.forEach(({ data }) => {
			// 	const $ = cheerio.load(data, { xmlMode: true });
			// 	$.root().find('icon').each((i, icon) => {
			// 		icon.tagName = 'symbol';
			// 		$(icon).attr('id', name);
			// 		return icon;
			// 	});

			// 	sprites.push($.root().html());
			// });

			await Promise.all(items).then(v => sprites = v);
			console.log(sprites);
			return sprites;
		})();
	}
});

styleDictionary.buildAllPlatforms();