const chalk = require('chalk');
const table = require('text-table');

function pluralize(word, count) {
	return (count === 1 ? word : `${word}s`);
}

module.exports = function(results) {
	var output = "\n";
	var	total = 0;
	var	errors = 0;
	var warnings = 0;
	var summaryColor = "yellow";
	var count = 1;

	results.forEach(function (result) {
		if (result.messages.length === 0) {
			return false;
		}

		total += result.messages.length;
		output += `${chalk.underline(result.filename)}\n`;
		output += table(result.messages.map(function (message) {
			var messageType = '';

			if (message.severity === 2) {
				messageType = chalk.red(message.type);
				summaryColor = "red";
				errors++;
			} else if (message.severity === 1) {
				messageType = chalk.yellow(message.type);
				warnings++;
			} else {
				messageType = chalk.yellow(message.type);
			}

			return [
				"",
				chalk.dim(message.line + ':' + message.column),
				messageType,
				chalk.bold(message.message.replace(/\.$/, ""))
			];
		}),  {
			align: ["", "r", "l"],
			stringLength(str) {
				return chalk.stripColor(str).length;
			}
		}) + '\n\n';
	})

	if (total > 0) {
		output += chalk[summaryColor]([
			"\u2716 ", total, pluralize(" compass usage", total),
			" (", errors, " ruby exclusive, ",
			warnings, " polyfillable in node-sass)\n"
		].join(""));

		output += chalk.underline.bold("\nHINTS:\n");
		if (total > warnings + errors) {
			output += count + ") Remove compass imports\n";
			count++;
		}
		if (warnings > 0) {
			output += count + ") Use https://github.com/Igosuki/compass-mixins to polyfill mixins\n";
			count++;
		}
		if (errors > 0) {
			output += count + ") Configure additional build tasks to mimic ruby functionality\n";
		}
	} else {
		output += chalk.green("\u263B No Compass dependencies, you can say farewell!\n")
	}

	return output;
}