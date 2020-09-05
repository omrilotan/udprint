const { prompt } = require('inquirer');

/**
 * Get parameters interactively
 * @param  {string} options.port    Default value
 * @param  {string} options.address Default value
 * @returns {Object} answers
 */
module.exports = async function ask({ port, address, encoding }) {
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
};

/**
 * Check if the requested encoding is valid
 * @param  {string} encoding
 * @returns {boolean}
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
