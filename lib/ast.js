const gonzales = require('gonzales-pe');

module.exports = function (text, filename) {
	var tree;

	text = text.toString();

	try {
		tree = gonzales.parse(text, {
			'syntax': 'scss'
		});
	} catch (e) {
		throw {
			message: e.message,
			file: filename,
			line: e.line
		};
	}

	if (typeof tree === 'undefined') {
		throw {
			message: 'Undefined tree',
			file: filename,
			text: text.toString(),
			tree: tree.toString()
		};
	}

	return tree;
};