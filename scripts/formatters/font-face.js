const fs = require('fs-extra');
const path = require('path');
const ttf2woff = require('ttf2woff');
const woff2 = require('woff2');
const cwd = process.cwd();

module.exports = {
	name: 'font-face',
	formatter: function(dictionary) {
		return dictionary.allProperties.reduce((fonts, { attributes, formats, value }) => {
			const slug = attributes.item.toLowerCase().replace(/\s+/g,'-');
			const baseName = path.basename(value);
			const destFile = path.resolve(cwd, 'dist/fonts', slug, baseName);
			const input = fs.readFileSync(`${value}.ttf`);
			const exts = Object.keys(formats);

			fs.mkdirp(path.dirname(destFile), () => {
				exts.forEach(ext => {
					let output;

					switch (ext) {
						case 'woff':
							output = ttf2woff(new Uint8Array(input)).buffer;
							break;

						case 'woff2':
							output = woff2.encode(input).buffer;
							break;

						default:
							output = input;
					}

					fs.writeFileSync(`${destFile}.${ext}`, Buffer.from(output));
				});
			});

			fonts.push([
				`@font-face {`,
				`font-family: "${attributes.item}";`,
				`src:${exts.map(ext => ` url("${formats[ext]}") format("${ext}")`).join(',')};`,
				`font-weight: ${attributes.weight};`,
				`font-style: ${attributes.style}`
			].filter(Boolean).join('\n\t').concat('\n}\n'));

			return fonts;
		}, []).join('\n');
	}
};
