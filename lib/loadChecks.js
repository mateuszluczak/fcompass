const path = require('path');
const fs = require('fs');

const ruby = ['ruby'];
const all = ['function', 'import', 'mixin', 'variable', 'ruby'];

function searchInArray(array, item) {
	for (var i = 0; i < array.length; i++) {
		if (array[i].indexOf(item) > -1) {
			return i;
		}
	}

	return -1;
}

module.exports = function (options) {
	var handlers = [];
	var config = options.ruby ? ruby : all;

	var checks = fs.readdirSync(path.join(__dirname, 'checks'));
	for (var i = 0; i < checks.length; i++) {
		checks[i] = path.join(__dirname, 'checks', checks[i]);
	}

	config.forEach(function(check) {
		var ruleSearch = searchInArray(checks, check);

		if (ruleSearch >= 0) {
			handlers.push(require(checks[ruleSearch]));
		}
	})

	return handlers;
}