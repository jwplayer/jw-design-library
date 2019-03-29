const fs = require('fs-extra');
const path = require('path');
const ttf2woff = require('ttf2woff');
const woff2 = require('woff2');

const cwd = process.cwd();

const fontFormats = {
	'woff': 'woff',
	'woff2': 'woff2',
	'ttf': 'truetype'
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
					const input = fs.readFileSync(`${value}.ttf`);
					let output;

					if (ext === 'woff') {
						output = ttf2woff(new Uint8Array(input)).buffer;
					} else if (ext === 'woff2') {
						output = woff2.encode(input).buffer;
					}

					fs.writeFileSync(`${destFile}.${ext}`, Buffer.from(output));
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
