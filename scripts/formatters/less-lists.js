function formatter(dictionary) {
	return dictionary.allProperties.map(prop => {
		let to_ret_prop = `@${prop.name}: ${(prop.attributes.category === 'asset' ? `"${prop.value}"` : prop.value.replace(/\[|\]/g, ''))};`;
		if (prop.comment) {
			to_ret_prop = to_ret_prop.concat(' /* ' + prop.comment + ' */');
		}
		return to_ret_prop;
	}).filter(function(strVal) { return !!strVal }).join('\n');
}

module.exports = formatter;