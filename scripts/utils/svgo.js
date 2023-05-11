/** This module is required to make SVGO behave like a synchronous function.
 *  Since style-dictionary is only synchronous, we need to deal with it on our
 * side. I should probably look into how Grunt and Gulp handle SVGO...
 */

const { optimize } = require('svgo');

module.exports = function() {
	return ({ id, file }) => {
		return optimize(file, {
			plugins: [
				{
					name: 'preset-default',
					params: {
						overrides: {
							mergePaths: false,
							cleanupIds: false,
						},
					},
				},
				{ name: 'addAttributesToSVGElement', params: { attribute: `id="${id}"` } },
			]
		}).data;
	};
};
