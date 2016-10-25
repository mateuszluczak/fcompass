const assert = require('assert');
const fs = require('fs');
const path = require('path');
const fcompass = require('../.');
const reporter = require('../lib/reporter');

describe('reporter', function () {

	it('should show ruby errors', function () {
		var file = fs.readFileSync(path.join(__dirname, '/sass/ruby.scss'), 'utf-8');
		var result = fcompass.checkFile('ruby.scss', file, {})
		var output = reporter([result]);

		assert(output.indexOf('4 ruby exclusive') !== -1);
	});

	it('should show pollyfillable finds', function () {
		var file = fs.readFileSync(path.join(__dirname, '/sass/mixin.scss'), 'utf-8');
		var result = fcompass.checkFile('mixin.scss', file, {})
		var output = reporter([result]);

		assert(output.indexOf('0 ruby exclusive') !== -1);
		assert(output.indexOf('3 polyfillable in node-sass') !== -1);
	});

});