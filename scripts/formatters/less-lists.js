const fileHeader = require('../utils/file-header');

module.exports = {
	name: 'less/variables/lists',
	formatter: function({ allProperties }) {
		return fileHeader(this.options) + allProperties.map(prop => {
			let to_ret_prop = `@${prop.name}: ${(prop.attributes.category === 'asset' ? `"${prop.value}"` : prop.value.replace(/\[|\]/g, ''))};`;
			if (prop.comment) {
				to_ret_prop = to_ret_prop.concat(' /* ' + prop.comment + ' */');
			}
			return to_ret_prop;
		}).filter(strVal => !!strVal).join('\n');
	}
};
