module.exports = {
	name: 'js',
	transforms: [
		'attribute/cti',
		'name/cti/camel',
		'size/rem',
		'color/css',
		'content/arrayToList', // convert YAML arrays into comma-separated lists
		'content/listToJsArray' // convert list into JS array to be stringified
	]
};
