const { join } = require('path');
const { promises: { readFile } } = require('fs');

/**
 * Read man file and print it
 * @return {void}
 */
module.exports = async function manual() {
	const file = join(__dirname, 'man.1');
	const content = await readFile(file);
	console.log(content.toString());
	process.exit(0);
};
