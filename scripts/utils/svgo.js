/** This module is required to make SVGO behave like a synchronous function.
 *  Since style-dictionary is only synchronous, we need to deal with it on our
 * side. I should probably look into how Grunt and Gulp handle SVGO...
 */

const SVGO = require('svgo');

const svgoPlugins = [
	{ cleanupAttrs: true },
	{ cleanupEnableBackground: true },
	{ cleanupIDs: true },
	{ cleanupNumericValues: true },
	{ collapseGroups: true },
	{ convertColors: true },
	{ convertPathData: true },
	{ convertShapeToPath: true },
	{ convertStyleToAttrs: true },
	{ convertTransform: true },
	{ mergePaths: true },
	{ moveElemsAttrsToGroup: true },
	{ moveGroupAttrsToElems: true },
	{ removeAttrs: { attrs: '(stroke|fill)' } },
	{ removeComments: true },
	{ removeDesc: true },
	{ removeDimensions: true },
	{ removeDoctype: true },
	{ removeEditorsNSData: true },
	{ removeEmptyAttrs: true },
	{ removeEmptyContainers: true },
	{ removeEmptyText: true },
	{ removeHiddenElems: true },
	{ removeMetadata: true },
	{ removeNonInheritableGroupAttrs: true },
	{ removeRasterImages: false },
	{ removeTitle: true },
	{ removeUnknownsAndDefaults: true },
	{ removeUnusedNS: true },
	{ removeUselessDefs: true },
	{ removeUselessStrokeAndFill: true },
	{ removeViewBox: false },
	{ removeXMLProcInst: true },
	{ sortAttrs: true }
];

module.exports = function() {
	return ({ id, file }) => {
		const svgo = new SVGO({
			plugins: [
				...svgoPlugins,
				{ addAttributesToSVGElement: { attribute: `id="${id}"` } }
			]
		});
		return svgo.optimize(file).then(({ data }) => data);
	};
};
