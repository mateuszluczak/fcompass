const fs = require('fs');
const glob = require('glob');
const ast = require('./lib/ast');
const loadChecks = require('./lib/loadChecks');
const reporter = require('./lib/reporter');

const processor = {};

processor.checkFile = function(filename, text, opts) {
	var checks = loadChecks(opts);
	var tree = {};
	var results = [];
	var detects;

	try {
		tree = ast(text, filename);
	} catch (e) {
		var line = e.line || 1;

		results = [{
			line: line,
			column: 1,
			type: 'error',
			message: e.message,
			severity: 1
		}];
	}

	if (tree.content && tree.content.length > 0) {
		checks.forEach(function (check) {
			detects = check.check(tree);
			results = results.concat(detects);
		});
	}

	results.sort(function(a, b) {
		return parseInt(a.line, 10) > parseInt(b.line, 10);
	});

	return {
		'filename': filename,
		'messages': results
	}
}

processor.process = function (path, opts) {
	var files = glob.sync(path, {nodir: true});
	var results = [];

	files.forEach(function (file) {
		var result = processor.checkFile(file, fs.readFileSync(file, 'utf-8'), opts);
		results.push(result);
	})

	var output = reporter(results);

	console.log(output);
}

module.exports = processor;