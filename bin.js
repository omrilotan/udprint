#!/usr/bin/env node

const { bold, yellow } = require('chalk');
const { prompt } = require('inquirer');
const parser = require('yargs-parser');
const manual = require('./lib/manual');
const udprint = require('.');

const [ , , ...rest ] = process.argv;

const args = parser(
	rest,
	{
		alias: {
			address: [ 'a' ],
			encoding: [ 'e' ],
			help: [ 'h' ],
			interactive: [ 'i' ],
			port: [ 'p' ],
		},
	},
);


args.help
	? manual()
	: run(args)
;

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

/**
 * Get parameters interactively
 * @param  {number} options.port    Default value
 * @param  {string} options.address Default value
 * @return {Object} answers
 */
async function ask({ port, address, encoding }) {
	const options = [];

	options.push({
		name: 'port',
		message: 'Port number',
		type: 'input',
		default: port || '8125',
	});

	options.push({
		name: 'address',
		message: 'Address (Hostname or IP)',
		type: 'input',
		default: address || '127.0.0.1',
	});

	options.push({
		name: 'encoding',
		message: 'Message encoding',
		type: 'list',
		default: encoding || 'utf8',
		choices: [
			{ name: 'utf8' },
			{ name: 'ascii' },
			{ name: 'base64' },
			{ name: 'binary' },
			{ name: 'hex' },
			{ name: 'latin1' },
			{ name: 'ucs2 (alias of utf16le)', value: 'ucs2' },
			{ name: 'utf16le' },
		],
	});

	({
		address,
		port,
		encoding,
	} = await prompt(options));

	return {
		address,
		port,
		encoding: validEncoding(encoding) ? encoding.toLowerCase() : undefined,
	};
}

/**
 * Check if the requested encoding is valid
 * @param  {string} encoding
 * @return {boolean}
 */
const validEncoding = encoding => encoding && [
	'utf8',
	'ascii',
	'base64',
	'binary',
	'hex',
	'latin1',
	'ucs2',
	'utf16le',
].includes(encoding.toLowerCase());
