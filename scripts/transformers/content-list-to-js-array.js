module.exports = {
	name: 'content/listToJsArray',
	type: 'value',
	matcher: prop => Array.isArray(prop.original.value),
	transformer: prop => prop.value.split(',')
};
