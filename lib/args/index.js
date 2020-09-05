const parser = require('yargs-parser');

const [ , , ...rest ] = process.argv;

module.exports = parser(
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
