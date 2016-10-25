const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const compassMixins = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../../data', 'mixins.yml'), 'utf8')).split(' ');

module.exports = {
	check: function (ast) {
		var result = [];

		ast.traverseByType('include', function (node) {
			node.traverse(function (elem) {
				if (elem.type === 'ident') {
					var index = compassMixins.indexOf(elem.content);

					if (index !== -1) {
						result.push({
							line: elem.start.line,
							column: elem.start.column,
							type: 'mixin',
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