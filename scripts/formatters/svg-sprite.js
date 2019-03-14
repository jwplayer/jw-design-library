const cheerio = require('cheerio');
const forceSync = require('sync-rpc');
const fs = require('fs');
const optimizeSVG = forceSync(require.resolve('../utils/svgo'));
const path = require('path');
const readline = require('readline');

function svgSpriteFormatter({ allProperties }, config) {
	const symbols = allProperties.reduce((icons, { name, value }) => {
		process.stdout.write('.');
		const file = fs.readFileSync(path.resolve(value), 'utf8');

		// Using cheerio to provide a minimal amount of safety
		let $ = cheerio.load(optimizeSVG({ id: name, file }), { xmlMode: true });
		$.root().find('svg').each((i, icon) => {
			icon.tagName = 'symbol';
			return icon;
		});

		icons.push($.root().html());

		return icons;
	}, []).join('\n\t');

	let svgId;
	if (this.id) {
		svgId = this.id;
		if (config.prefix) {
			svgId = [config.prefix, svgId].join('-');
		}
	}

	readline.clearLine(process.stdout);
	readline.cursorTo(process.stdout, 0);

	return `<svg xmlns="http://www.w3.org/2000/svg" ${svgId ? `id="${svgId}"` : ''} style="display:none">\n\t${symbols}\n</svg>`;
}

module.exports = svgSpriteFormatter;