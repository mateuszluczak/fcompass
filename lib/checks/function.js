const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const compassFunctions = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../../data', 'functions.yml'), 'utf8')).split(' ');

module.exports = {
	check: function (ast) {
		var result = [];

		ast.traverseByType('function', function (node) {
			node.traverse(function (elem) {
				if (elem.type === 'ident') {
					var index = compassFunctions.indexOf(elem.content.toLowerCase());

					if (index !== -1) {
						result.push({
							line: elem.start.line,
							column: elem.start.column,
							type: 'function',
							message: '\'' + elem.content + '\' function used',
							severity: 1
						})
					}
				}
			});
		});

		return result;
	}
}