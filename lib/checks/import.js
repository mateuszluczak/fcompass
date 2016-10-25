var getImportPath = function (parent, syntax) {
	if (parent.first('uri')) {
		return parent.first('uri');
	}

	if (parent.first('string')) {
		return parent.first('string').content.replace(/['"]+/g, '');
	}

	if (parent.first('ident')) {

		if (syntax === 'sass') {
			var output = '',
				isFinished = false;

			parent.forEach(function (item) {
				if (!isFinished) {
					if (
						item.type === 'string'
						|| item.type === 'operator'
						|| item.type === 'ident'
					) {
						output += item.content;
					}

					if (item.type === 'class') {
						if (item.first('ident')) {
							output += '.' + item.first('ident').content;
						}

						isFinished = true;
					}
				}
			});

			return output.trim();
		}

		return parent.first('ident');
	}

	return false;
};

module.exports = {
	check: function (ast) {
		var result = [];

		ast.traverseByType('atkeyword', function (node, i, parent) {
			node.traverse(function (elem) {
				if (elem.content === 'import') {
					var importPath = getImportPath(parent, node.syntax);

					if (importPath.indexOf('compass') > -1) {
						result.push({
							line: elem.start.line,
							column: elem.start.column,
							type: 'import',
							message: '\'' + importPath + '\' imported',
							severity: 0
						})
					}
				}
			});
		});

		return result;
	}
}