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
			// draw the dot
			process.stdout.write('.');
			const file = fs.readFileSync(path.resolve(prop.value), 'utf8');

			// Run the icon through SVGO
			const optimizedSVG = optimizeSVG({ id: prop.name, file });

			// Save the optimized standalone icon
			const spritePath = `/${path.resolve.apply(null, ['dist', ...prop.path])}.svg`;
			fs.mkdirp(path.dirname(spritePath), err => {
				fs.writeFileSync(spritePath, optimizedSVG);
			});

			// Using cheerio to provide a minimal amount of safety
			let $ = cheerio.load(optimizedSVG, { xmlMode: true });
			$.root().find('svg').each((i, icon) => {
				$(icon).attr('xmlns', null);
				icon.tagName = 'symbol';
				return icon;
			});

			icons.push($.root().html());
			return icons;
		}, []).join('\n\t');

		readline.clearLine(process.stdout);
		readline.cursorTo(process.stdout, 0);

		// Generate the SVG wrapper's ID
		let svgId;
		if (this.id) {
			svgId = this.id;
			if (config.prefix) {
				svgId = [config.prefix, svgId].join('-');
			}
		}

		return `<svg xmlns="http://www.w3.org/2000/svg" id="${svgId}" style="display:none">\n\t${symbols}\n</svg>`;
	}
};
