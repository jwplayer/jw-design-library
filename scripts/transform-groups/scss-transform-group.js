module.exports = {
	name: 'scss',
	transforms: [
		'attribute/cti',
		'name/cti/kebab',
		'time/seconds',
		'color/css', // replaces built-in `color/hex` choice, fixes rgba
		'content/arrayToList' // convert YAML arrays into comma-separated lists
	]
};
