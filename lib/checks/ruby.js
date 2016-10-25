const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const rubyFunctions = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../../data', 'ruby.yml'), 'utf8')).split(' ');

module.exports = {
	check: function (ast) {
		var result = [];

		ast.traverseByType('function', function (node) {
			node.forEach(function (elem) {
				if (elem.type === 'ident') {
					var index = rubyFunctions.indexOf(elem.content.toLowerCase());

					if (index !== -1) {
						result.push({
							line: elem.start.line,
							column: elem.start.column,
							type: 'ruby',
							message: '\'' + elem.content + '\' used',
							severity: 2
						})
					}
				}
			});
		});

		return result;
	}
}