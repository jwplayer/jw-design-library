const cheerio = require('cheerio');
const forceSync = require('sync-rpc');
const fs = require('fs');
const optimizeSVG = forceSync(require.resolve('./optimize-svg'));
const path = require('path');
const styleDictionary = require('style-dictionary').extend('./config.json');

styleDictionary.registerFormat({
	name: 'svg/sprite',
	formatter: ({ allProperties }, config) => {
		let items = [];

		allProperties.forEach(({ name, value }) => {
			const file = fs.readFileSync(path.resolve(value), 'utf8');
			items.push({ name, data: optimizeSVG({ id: name, file }) });
		});

		items = items.map(item => {
			// Using cheerio to provide a minimal amount of safety
			let $ = cheerio.load(item.data, { xmlMode: true });
			$.root().find('svg').each((i, icon) => {
				icon.tagName = 'symbol';
				return icon;
			});

			return $.root().html();
		}).join('');

		return `<svg xmlns="http://www.w3.org/2000/svg">${items}</svg>`;
	}
});

styleDictionary.buildAllPlatforms();
