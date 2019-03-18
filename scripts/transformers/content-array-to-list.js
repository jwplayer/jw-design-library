module.exports = {
	name: 'content/arrayToList',
	type: 'value',
	matcher: prop => Array.isArray(prop.original.value),
	transformer: prop => prop.original.value.join(',')
};
