const fileHeader = require('../utils/file-header');

module.exports = {
	name: 'javascript/es6/arrays',
	formatter: function(dictionary) {
		return fileHeader(this.options) + dictionary.allProperties.filter(({value}) => value.match(/^\[.*\]$/)).map(prop => {
			let to_ret_prop = `export const ${prop.name} = [${prop.value.replace(/\[|\]/g, '').split(/,\s*/).map(v => JSON.stringify(v)).join(', ')}];`;
			if (prop.comment) {
				to_ret_prop = to_ret_prop.concat(' // ' + prop.comment);
			}
			return to_ret_prop;
		}).join('\n');
	}
};
