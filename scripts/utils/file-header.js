const rewire = require('rewire');
const formats = rewire('style-dictionary/lib/common/formats.js');
const fileHeader = formats.__get__('fileHeader');

module.exports = fileHeader;
