const { man } = require('../../package.json');
const { resolve } = require('path');
const { promises: { readFile } } = require('fs');

/**
 * Read man file and print it
 * @return {void}
 */
module.exports = async function manual() {
	const file = resolve(man);
	const content = await readFile(file);
	console.log(content.toString());
	process.exit(0);
};
