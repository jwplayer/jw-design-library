const fs = require('fs-extra');
const path = require('path');

const cwd = process.cwd();

const fontFormats = {
	'woff': 'woff',
	'woff2': 'woff2',
	'ttf': 'truetype',
	'otf': 'opentype',
	'eot': 'embedded-opentype',
	'svg': 'svg',
	'svgz': 'svgz'
};

module.exports = {
	name: 'font-face',
	formatter: function(dictionary, config) {
		return dictionary.allProperties.reduce((fonts, { attributes, family, formats, style, weight, value }) => {
			const fileBaseName = path.basename(value);
			let distDir = path.resolve(cwd, 'dist', 'fonts', attributes.item);
			const srcPath = `${path.relative(path.resolve(config.buildPath), distDir)}/${fileBaseName}`;
			const destFile = path.resolve(distDir, fileBaseName);

			formats.forEach(ext => {
				fs.mkdirp(path.dirname(destFile), err => {
					fs.copyFileSync(`${value}.${ext}`, `${destFile}.${ext}`);
				});
			});

			fonts.push([
				`@font-face {`,
				`font-family: "${family}";`,
				`src:${formats.map(format => ` url("${srcPath}.${format}") format("${fontFormats[format]}")`).join(',')};`,
				weight ? `font-weight: ${weight};` : null,
				style ? `font-style: ${style}` : null
			].filter(Boolean).join('\n\t').concat('\n}\n'));

			return fonts;
		}, []).join('\n');
	}
};
