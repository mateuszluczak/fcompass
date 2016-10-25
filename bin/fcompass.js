#!/usr/bin/env node
'use strict';
const meow = require('meow');
const fcompass = require('../');

var cli = meow([
	'Usage',
	'  $ fcompass <glob>',
	'',
	'Example',
	'  $ fcompass "sass/**/*.scss"',
	'',
	'Options',
	'  --ruby       Show only functions requiring ruby.',
]);


if (!cli.input[0]) {
	console.error('Please specify a path');
	process.exit(1);
}

try {
	fcompass.process(cli.input[0], cli.flags);
	process.exit();
} catch (err) {
	console.log(err);
	if (err.noStack) {
		console.error(err.message);
		process.exit(1);
	} else {
		throw err;
	}
}