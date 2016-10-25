const assert = require('assert');
const fcompass = require('../.');
const fs = require('fs');
const path = require('path');

describe('fcompass', function () {

	it('should detect functions', function () {
		var file = fs.readFileSync(path.join(__dirname, '/sass/function.scss'), 'utf-8');
		var result = fcompass.checkFile('function.scss', file, {})

		assert(result.messages.length === 2);
	});

	it('should detect imports', function () {
		var file = fs.readFileSync(path.join(__dirname, '/sass/import.scss'), 'utf-8');
		var result = fcompass.checkFile('import.scss', file, {})

		assert(result.messages.length === 3);
	});

	it('should detect mixins', function () {
		var file = fs.readFileSync(path.join(__dirname, '/sass/mixin.scss'), 'utf-8');
		var result = fcompass.checkFile('mixin.scss', file, {})

		assert(result.messages.length === 3);
	});

	it('should detect variables', function () {
		var file = fs.readFileSync(path.join(__dirname, '/sass/variable.scss'), 'utf-8');
		var result = fcompass.checkFile('variable.scss', file, {})

		assert(result.messages.length === 3);
	});

	it('should detect ruby', function () {
		var file = fs.readFileSync(path.join(__dirname, '/sass/ruby.scss'), 'utf-8');
		var result = fcompass.checkFile('ruby.scss', file, {})

		assert(result.messages.length === 4);
	});
});