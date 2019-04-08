module.exports = {
	name: 'attribute/font',
	type: 'attribute',
	transformer: prop => ({
		category: prop.path[0],
		type: prop.path[1],
		family: prop.path[2],
		weight: prop.path[3],
		style: prop.path[4]
	})
};
