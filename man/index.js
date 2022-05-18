const { join } = require('path');
const { promises: { readFile } } = require('fs');

const { version, arch, platform } = process;
const node_details = Object.entries({ version, arch, platform }).map(([ key, value ]) => [ key, value ].join(':%20')).join(',%20');
const data = { node_details };

/**
 * Read man file and print it
 * @return {void}
 */
module.exports = async function manual() {
	const file = join(__dirname, 'udprint.1');
	const content = await readFile(file);
	const man = content.toString().replace(
		/\${\s*(\w+)\s*}/mg,
		(match, group) => data[group] || group,
	);
	console.log(man);
	process.exit(0);
};
