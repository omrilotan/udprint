const parser = require('yargs-parser');

const [ , , ...rest ] = process.argv;

module.exports = parser(
	rest,
	{
		alias: {
			address: [ 'a' ],
			clean: [ 'c' ],
			encoding: [ 'e' ],
			forward: [ 'f' ],
			help: [ 'h' ],
			interactive: [ 'i' ],
			port: [ 'p' ],
			silent: [ 's' ],
		},
	},
);
