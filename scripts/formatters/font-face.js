const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
const ttf2woff = require('ttf2woff');
const woff2 = require('woff2');
const cwd = process.cwd();

const convertFont = (ext, input) => {
	let output = input;
	if (ext === 'woff') {
		output = ttf2woff(new Uint8Array(input)).buffer;
	}

	if (ext === 'woff2') {
		output = woff2.encode(input).buffer;
	}

	return Buffer.from(output);
}

const formatter = ({ allProperties }) => allProperties.reduce((fonts, prop) => {
	const { attributes: { family, weight, style }, formats = {}, value } = prop;
	const baseName = path.basename(value, '.ttf');
	const fileSlug = family.toLowerCase().replace(/\s+/g,'-');
	const fullDestPath = path.resolve(cwd, 'dist/fonts', fileSlug, baseName);

	const exts = Object.keys(formats);
	const ttfFile = fs.readFileSync(value);

	fs.mkdirp(path.dirname(fullDestPath), () => {
		exts.forEach(ext => {
			// draw the dot
			const thisDestFile = `${fullDestPath}.${ext}`;
			process.stdout.write(`Processing Fonts... ${baseName}.${ext}`);
			fs.writeFileSync(thisDestFile, convertFont(ext, ttfFile));
			readline.clearLine(process.stdout);
			readline.cursorTo(process.stdout, 0);
		});
	});

	fonts.push([
		`@font-face {`,
		`font-family: "${family}";`,
		`src:${exts.map(x => ` url("${formats[x]}") format("${x}")`)};`,
		`font-weight: ${weight};`,
		`font-style: ${style};`,
		'font-display: fallback;'
	].filter(Boolean).join('\n\t').concat('\n}\n'));

	return fonts;
}, []).join('\n');

module.exports = {
	name: 'font-face',
	formatter
};
