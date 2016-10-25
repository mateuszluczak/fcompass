const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const variables = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../../data', 'variables.yml'), 'utf8')).split(' ');

module.exports = {
	check: function (ast) {
		var result = [];

		ast.traverseByType('variable', function (node) {
			node.traverse(function (elem) {
				if (elem.type === 'ident') {
					var index = variables.indexOf(elem.content.toLowerCase());

					if (index !== -1) {
						result.push({
							line: elem.start.line,
							column: elem.start.column,
							type: 'variable',
							message: '\'' + elem.content + '\' used',
							severity: 1
						})
					}
				}
			});
		});

		return result;
	}
}