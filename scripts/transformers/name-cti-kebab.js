const _ = require('lodash');

module.exports = {
  name: 'name/cti/kebab',
  type: 'name',
  transformer: (prop, options) => {
    return _.kebabCase([options.prefix].concat(prop.path).join(' ')).replace(/\b(h)-(\d)\b/, '$1$2');
  }
};
