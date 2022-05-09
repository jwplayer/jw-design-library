const Module = require('module');
const yaml = require('js-yaml');
const fs = require('fs');

/**
 * Override the `require` function itself to pretend that YAML files are modules
 * like JSON. This works because `combineJSON` tries to require each file found
 * in the `sources` glob.
 */
Module.prototype.require = new Proxy(Module.prototype.require, {
	apply(target, thisArg, argumentsList) {
		if (/\.yaml/g.test(argumentsList[0])) {
			return yaml.load(fs.readFileSync(argumentsList[0]));
		}
		return Reflect.apply(target, thisArg, argumentsList);
	}
});
