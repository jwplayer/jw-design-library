const cheerio = require('cheerio');
const fs = require('fs-extra');
const forceSync = require('sync-rpc');
const optimizeSVG = forceSync(require.resolve('../utils/svgo'));
const path = require('path');
const readline = require('readline');

module.exports = {
	name: 'svg/sprites',
	formatter: function(dictionary, config) {
		const symbols = dictionary.allProperties.reduce((icons, prop) => {
			process.stdout.write('.');
			const file = fs.readFileSync(path.resolve(prop.value), 'utf8');

			// Using cheerio to provide a minimal amount of safety
			const optimizedSVG = optimizeSVG({ id: prop.name, file });

			const spritePath = `${path.resolve(config.buildPath)}/${this.id}/${prop.name}.svg`;
			fs.mkdirp(path.dirname(spritePath), err => {
				fs.writeFileSync(spritePath, optimizedSVG);
			});

			let $ = cheerio.load(optimizedSVG, { xmlMode: true });
			$.root().find('svg').each((i, icon) => {
				$(icon).attr('xmlns', null);
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

		return `<svg xmlns="http://www.w3.org/2000/svg" id="${svgId}" style="display:none">\n\t${symbols}\n</svg>`;
	}
};
