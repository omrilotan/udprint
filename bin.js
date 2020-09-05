#!/usr/bin/env node

const { bold, yellow } = require('chalk');
const manual = require('./man');
const args = require('./lib/args');
const ask = require('./lib/ask');
const udprint = require('.');

args.help
	? manual()
	: run(args)
;

/**
 * @param {Array} _
 * @param {string} address
 * @param {string} encoding
 * @param {string} interactive
 * @param {string} port
 * @returns {void}
 */
async function run({ _, address, encoding, interactive, port }) {
	try {
		if (!port && !address) {
			([ port, address ] = _);
		}

		if (interactive) {
			({ port, address, encoding } = await ask({ port, address, encoding }));
		}

		await udprint({ port, address, encoding });
	} catch (error) {
		if (error.code === 'EADDRINUSE') {
			console.log([
				`The address ${yellow([ error.address, error.port ].join(':'))} seems to be in use.`,
				'I\'m going to re run in interactive mode.',
				bold('Please enter a different address.'),
			].join('\n'));
			return run({ _, address, encoding, interactive: true, port });
		}

		console.error(error);
		process.exit(1);
	}
}
