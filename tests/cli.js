const assert = require('assert');
const exec = require('child_process').exec;

describe('cli', function() {

	it('should return help instructions', function (done) {
		var command = 'fcompass --help';

		exec(command, function (err, stdout) {
			if (err) {
				return done(err);
			}

			assert(stdout.indexOf('Example') > 0);

			return done();
		});
	});

	it('should return a version', function (done) {
		var command = 'fcompass --version';

		exec(command, function (err, stdout) {
			if (err) {
				return done(err);
			}

			assert(stdout.match(/^[0-9]+.[0-9]+(.[0-9]+)?/));

			return done();
		});
	});

	it('should accept files', function (done) {
		var command = 'fcompass "tests/sass/*.scss"';

		exec(command, function (err, stdout) {

			if (err) {
				return done(err);
			}

			assert(stdout.indexOf('.scss') !== -1);

			return done();
		});
	});

	it('should show only ruby related', function (done) {
		var command = 'fcompass "tests/sass/*.scss" --ruby';

		exec(command, function (err, stdout) {

			if (err) {
				return done(err);
			}

			assert(stdout.indexOf('tests/sass/ruby.scss') !== -1);
			assert(stdout.indexOf('tests/sass/mixin.scss') === -1);

			return done();
		});
	});
});